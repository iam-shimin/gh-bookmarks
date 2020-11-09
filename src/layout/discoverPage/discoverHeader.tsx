import React from 'react';

import TitleBar, { Title, BackButton } from 'components/titleBar';
import SearchBar from 'components/searchBar';

type DiscoverHeaderProps = Searchable & {
	search: SearchObj
}

export default function DiscoverHeader(
	{search, onSearch}: DiscoverHeaderProps
) {

	const searchTypeDisplay = search.type === 'repo'
		? 'Repositories'
		: 'Usernames';

	function handleSearchChange(event: React.ChangeEvent<HTMLSelectElement>) {
		const {name, value} = event.target;
		onSearch(name, value);
	}

	return (
		<header>
			<TitleBar>
				<BackButton />
				<Title text="Discover" />
			</TitleBar>
			<SearchBar placeholder={`Search GitHub for ${searchTypeDisplay}`} onSearch={onSearch}>
				<select name="type" title="Search by Type" defaultValue="repo" onChange={handleSearchChange}>
					<option value="user">Username</option>
					<option value="repo">Repository</option>
				</select>
			</SearchBar>
		</header>
	)
}