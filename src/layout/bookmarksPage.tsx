import React from 'react';
import { Link } from 'react-router-dom';

import TitleBar, {Title, NewButton} from 'components/titleBar';
import SearchBar from 'components/searchBar';
import BookmarkCard from 'components/card/bookmarkCard';
import Footer from 'components/footer';
import AlertBox from 'components/alert';
import Container from 'components/container';

import { getBookmarks } from 'utils/storage';

export default function BookmarksPage() {
	const added = getBookmarks();
	return (
		<>
			<BookmarksHeader />
			<Container>

				{added.length === 0
					? <AlertBox>Bookmarks added from the Discover Page <Link to="/discover">[+ New ]</Link> will be shown here</AlertBox>
					: added.map(bmkId => <BookmarkCard id={bmkId} />)
				}
				
			</Container>
			<Footer />
		</>
	)
}

function BookmarksHeader() {
	return (
		<header>
			<TitleBar>
				<Title text="Bookmarks" />
				<NewButton />
			</TitleBar>
			<SearchBar placeholder="Search Bookmarks" />
		</header>
	)
}