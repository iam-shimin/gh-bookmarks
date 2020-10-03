import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from './card';

import { removeBookmark } from 'utils/storage';

import 'style/bmkCard.css';

export default function BookmarkCard({id}: {id: string}) {
	return (
		<Card className="bmk-card">
			<h1>Repo name</h1>
			<span>Real name (to be shown if renamed)</span>
			<Button variant="danger" className="add-bmk-btn" onClick={() => removeBookmark(id)}>Remove Bookmark</Button>
		</Card>
	)
}