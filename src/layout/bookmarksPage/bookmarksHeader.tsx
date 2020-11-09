import React from 'react';

import TitleBar, {Title, NewButton} from 'components/titleBar';
import SearchBar from 'components/searchBar';

type BookmarksHeaderProps = {
	onSearch: SearchCallback
}

export default function BookmarksHeader({onSearch}: BookmarksHeaderProps) {
	return (
		<header>
			<TitleBar>
				<Title text="Bookmarks" />
				<NewButton />
			</TitleBar>
			<SearchBar placeholder="Search Bookmarks" onSearch={onSearch} />
		</header>
	)
}
