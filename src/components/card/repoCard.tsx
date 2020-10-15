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
	//html_url

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
			<span className="title">{data.full_name}</span>
			<p>{data.description}</p>
			<Button variant={variant} className="add-bmk-btn" onClick={onClick}>{label}</Button>
		</Card>
	);
}

const mapStateToProps = (state: BookmarkState, props: RepoCardOwnProps) => ({
	isBookmarked: !!state[props.data.id as keyof typeof state]
});

const mapDispatchToProps = {
	addBookmark,
	removeBookmark
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoCard)