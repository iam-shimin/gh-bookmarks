import React from 'react';

import TitleBar, {Title, NewButton} from 'components/titleBar';
import SearchBar from 'components/searchBar';
import BookmarkCard from 'components/card/bookmarkCard';
import Footer from 'components/footer';

import AlertBox from 'components/alert';
import Container from 'components/container';

export default function BookmarksPage() {
	return (
		<>
			<BookmarksHeader />
			<Container>
				<AlertBox />
				<BookmarkCard />
				<BookmarkCard />
				<BookmarkCard />
				<BookmarkCard />
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