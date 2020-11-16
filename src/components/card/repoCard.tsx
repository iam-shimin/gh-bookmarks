import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import Card from './card';

import { addBookmark, removeBookmark, renameBookmark } from 'store/actionCreators';

import 'style/repoCard.css';

type RepoCardOwnProps = {
	data: IRepository
}

type RepoCardStateProps = {
	persistedData: IRepository
}

type RepoCardDispatchProps = {
	addBookmark: typeof addBookmark,
	removeBookmark: typeof removeBookmark,
	renameBookmark: typeof renameBookmark
}

type RepoCardProps = RepoCardOwnProps & RepoCardStateProps & RepoCardDispatchProps;

function RepoCard({
	data,
	persistedData,
	addBookmark,
	removeBookmark,
	renameBookmark
}: RepoCardProps) {

	const [isEditingName, setIsEditingName] = React.useState(false);
	const renameTextFieldRef: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);

	const isBookmarked = !!persistedData;
	const repoData = isBookmarked? persistedData: data;
	const isBookmarkRenamed = repoData.displayName && repoData.displayName !== repoData.full_name;
	const repoDisplayName = repoData.displayName || repoData.full_name;

	const label = isBookmarked
		? 'Remove Bookmark'
		: 'Add bookmark';
	const onClick = isBookmarked
		? () => removeBookmark(data.id)
		: () => addBookmark(data);
	const variant = isBookmarked
		? 'danger'
		: 'primary';
	
	const editButtonLabel = isEditingName
		? 'Cancel'
		: 'Rename';
	
	function handleEditToggle(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();
		setIsEditingName(current => !current);
	}

	function handleRename() {
		renameBookmark(data.id, renameTextFieldRef.current?.value || '');
		setIsEditingName(false);
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		handleRename();
	}

	React.useEffect(() => {
		if (isEditingName) {
			renameTextFieldRef.current?.focus();
		}
	}, [isEditingName])
	
	return (
		<Card className="repo-card">
			{isEditingName
				? (
					<form onSubmit={handleSubmit}>
						<input style={{width: '100%'}} defaultValue={repoDisplayName} ref={renameTextFieldRef} />
					</form>
				)
				: (
					<a href={data.html_url} target="_blank" rel="noopener noreferrer">
							<span className="title">{repoDisplayName}</span>
					</a>
				  )
			}

			{isBookmarkRenamed && <small>{data.full_name}</small>}

			<p>{data.description}</p>
			<div className="mt-1">
				{isEditingName && <Button variant="dark" className="ml-1 btn-sep" onClick={handleRename}>Set</Button>}
				{isBookmarked && <Button variant="dark" className="ml-1 btn-sep" onClick={handleEditToggle}>{editButtonLabel}</Button>}
				<Button variant={variant} className="ml-1 add-bmk-btn btn-sep" onClick={onClick}>{label}</Button>
			</div>

		</Card>
	);
}

const mapStateToProps = (state: BookmarkState, props: RepoCardOwnProps) => ({
	persistedData: state.repos[props.data.id]
});

const mapDispatchToProps = {
	addBookmark,
	removeBookmark,
	renameBookmark
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoCard)