import React from 'react';
import { Link } from 'react-router-dom';

import Card from './card';
import Avatar from 'components/avatar';

import 'style/userCard.css';

export default function UserCard({data: {login, avatar_url, repos_url}}: any) {
	
	// console.log(repos_url, avatar_url);
	return (
		<Link className="user-card-link" to={`/discover/user/${login}`}>
			<Card className="user-card">
				<h1>{login}</h1>
				<Avatar src={avatar_url} />
			</Card>
		</Link>
	);
}