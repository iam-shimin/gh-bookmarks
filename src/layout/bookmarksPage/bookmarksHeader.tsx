import React from 'react';

import TitleBar, {Title, NewButton} from 'components/titleBar';
import SearchBar from 'components/searchBar';

export default function BookmarksHeader({onSearch}: Searchable) {
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
