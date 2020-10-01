import React from 'react';

import TitleBar, { Title, BackButton } from 'components/titleBar';
import SearchBar from 'components/searchBar';
import Container from 'components/container';
import RepoCard from 'components/card/bookmarkCard';
import Footer from 'components/footer';

export default function DiscoverPage() {
	return (
		<>
			<DiscoverHeader />
			<Container>
				<RepoCard />
				<RepoCard />
				<RepoCard />
				<RepoCard />
			</Container>
			<Footer />
		</>
	)
}

function DiscoverHeader() {
	return (
		<header>
			<TitleBar>
				<BackButton />
				<Title text="Discover" />
			</TitleBar>
			<SearchBar placeholder={`Search GitHub for Repositories`}>
				<select name="type" title="Search by Type" defaultValue="repo">
					<option value="user">Username</option>
					<option value="repo">Repository</option>
				</select>
			</SearchBar>
		</header>
	)
}