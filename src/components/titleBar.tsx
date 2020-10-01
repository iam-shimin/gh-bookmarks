import React from 'react';
import { Link } from 'react-router-dom';

import 'style/titleBar.css';

export function Title({text}: {text: string}) {
	return <span className="titlebar-title">{text}</span>
}

export function BackButton() {
	return <Link to="/" className="titlebar-backbtn util--no-underline" title="Go Back to Bookmarks">{'<'}</Link>;
}

export function NewButton() {
	return <Link to="/discover" className="addbmk-btn util--no-underline">+ New</Link>
}

export default function TitleBar({children}: {children: React.ReactNode}) {
	return (
		<div className="titlebar">
			{children}
		</div>
	)
}