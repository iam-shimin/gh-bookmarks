import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import Card from './card';

import { addBookmark, removeBookmark } from 'store/actionCreators';

import 'style/repoCard.css';

type RepoCardOwnProps = {
	data: IRepository
}

type RepoCardStateProps = {
	isBookmarked: boolean
}

type RepoCardDispatchProps = {
	addBookmark: typeof addBookmark,
	removeBookmark: typeof removeBookmark
}

type RepoCardProps = RepoCardOwnProps & RepoCardStateProps & RepoCardDispatchProps;

function RepoCard({
	data,
	isBookmarked,
	addBookmark,
	removeBookmark
}: RepoCardProps) {

	const [isEditingName, setIsEditingName] = React.useState(false);
	const renameTextFieldRef: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);

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

	React.useEffect(() => {
		if (isEditingName) {
			renameTextFieldRef.current?.focus();
		}
	}, [isEditingName])
	
	return (
		<Card className="repo-card">
			{isEditingName
				? <input defaultValue={data.full_name} ref={renameTextFieldRef} />
				: (
					<a href={data.html_url} target="_blank" rel="noopener noreferrer">
						<span className="title">{data.full_name}</span>
					</a>
				  )
			}

			{isBookmarked && <button onClick={handleEditToggle}>{editButtonLabel}</button>}

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
	removeBookmark
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoCard)