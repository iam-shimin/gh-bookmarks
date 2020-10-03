import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from './card';

import { addBookmark, bookmarkExist, removeBookmark } from 'utils/storage';

import 'style/repoCard.css';

export default function RepoCard({data}: {data: any}) {
	//html_url
	const isBookmarked = bookmarkExist(data.id);
	const label = isBookmarked
		? 'Remove Bookmark'
		: 'Add bookmark';
	const onClick = isBookmarked
		? () => removeBookmark(data.id)
		: () => addBookmark(data.id, data);
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