import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import BookmarksHeader from './bookmarksHeader';
import RepoCard from 'components/card/repoCard';
import Footer from 'components/footer';
import AlertBox from 'components/alert';
import Container from 'components/container';

type StateProps = {
	bookmarkCollection: BookmarkState
}


function BookmarksPage({ bookmarkCollection }: StateProps) {

	const [search, setSearch] = React.useState('');
	const bmksMatchingSearch = search
		? bookmarkCollection
			.bmkById
			.filter(bmkId => (
				bookmarkCollection.repos[bmkId].displayName?.toLowerCase().includes(search) ||
				bookmarkCollection.repos[bmkId].name.toLowerCase().includes(search) ||
				bookmarkCollection.repos[bmkId].full_name.toLowerCase().includes(search)
			))
		: bookmarkCollection.bmkById;

	function handleSearch(_: any, search: string) {
		setSearch(search.toLowerCase());
	}

	return (
		<>
			<BookmarksHeader onSearch={handleSearch} />
			<Container>

				{
					bmksMatchingSearch.length === 0
						? <AlertBox>Bookmarks added from the Discover Page <Link to="/discover">[+ New ]</Link> will be shown here</AlertBox>
						: bmksMatchingSearch.map(bmkId => <RepoCard key={bmkId} data={bookmarkCollection.repos[bmkId]} />)
				}
				
			</Container>
			<Footer />
		</>
	)
}

const mapStateToProps = (state: BookmarkState) => ({
	bookmarkCollection: state
})

export default connect(mapStateToProps)(BookmarksPage)