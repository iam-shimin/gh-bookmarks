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

	const label = isBookmarked
		? 'Remove Bookmark'
		: 'Add bookmark';
	const onClick = isBookmarked
		? () => removeBookmark(data.id)
		: () => addBookmark(data);
	const variant = isBookmarked
		? 'danger'
		: 'primary';
	
	return (
		<Card className="repo-card">
			<a href={data.html_url} target="_blank" rel="noopener">
				<span className="title">{data.full_name}</span>
			</a>
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