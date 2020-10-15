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
	isBookmarked: boolean
}

type RepoCardDispatchProps = {
	addBookmark: typeof addBookmark,
	removeBookmark: typeof removeBookmark,
	renameBookmark: typeof renameBookmark
}

type RepoCardProps = RepoCardOwnProps & RepoCardStateProps & RepoCardDispatchProps;

function RepoCard({
	data,
	isBookmarked,
	addBookmark,
	removeBookmark,
	renameBookmark
}: RepoCardProps) {

	const [isEditingName, setIsEditingName] = React.useState(false);
	const renameTextFieldRef: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);

	const repoDisplayName = data.displayName || data.full_name;
	const isBookmarkRenamed = data.displayName && data.displayName !== data.full_name;

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
	
	function handleEditToggle(event: any) {
		event.stopPropagation();
		setIsEditingName(current => !current);
	}

	function handleRename() {
		renameBookmark(data.id, renameTextFieldRef.current?.value || '');
		setIsEditingName(false);
	}

	React.useEffect(() => {
		if (isEditingName) {
			renameTextFieldRef.current?.focus();
		}
	}, [isEditingName])
	
	return (
		<Card className="repo-card">
			{isEditingName
				? <input defaultValue={repoDisplayName} ref={renameTextFieldRef} />
				: (
					<>
						<a href={data.html_url} target="_blank" rel="noopener noreferrer">
							<span className="title">{repoDisplayName}</span>
						</a>
						{isBookmarkRenamed && <small>{data.full_name}</small>}
					</>
				  )
			}

			{(isEditingName || isBookmarked) && (
				<div>
					{isEditingName && <button onClick={handleRename}>Set</button>}
					{isBookmarked && <button onClick={handleEditToggle}>{editButtonLabel}</button>}
				</div>
			)}

			<p>{data.description}</p>
			<Button variant={variant} className="add-bmk-btn" onClick={onClick}>{label}</Button>
		</Card>
	);
}

const mapStateToProps = (state: BookmarkState, props: RepoCardOwnProps) => ({
	isBookmarked: !!state.repos[props.data.id]
});

const mapDispatchToProps = {
	addBookmark,
	removeBookmark,
	renameBookmark
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoCard)