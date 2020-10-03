import React from 'react';
import { Route } from 'react-router-dom';

import Spinner from 'components/spinner';
import TitleBar, { Title, BackButton } from 'components/titleBar';
import AlertBox from 'components/alert';
import SearchBar from 'components/searchBar';
import Container from 'components/container';
import RepoCard from 'components/card/repoCard';
import UserCard from 'components/card/userCard';
import UserDiscover from 'layout/userDiscover';
import Footer from 'components/footer';

import repositoryService from 'services/repos';
import userService from 'services/users';

type Items = {
	type: string,
	data: any[] | null
}


export default function DiscoverPage() {
	const [items, setItems] = React.useState<Items>({
		type: 'repo',
		data: null
	});

	const [search, setSearch] = React.useState({
		type: 'repo',
		q: ''
	});

	const prevSearch = React.useRef({type: '', q: ''});

	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<Error | null>(null);

	const Card = items.type === 'repo'
		? RepoCard
		: UserCard;
	
	const isEmptyList = items?.data?.length === 0;
	const isFirstVisit = !isLoading && items.data === null;
	const shouldShowAlert = error || isFirstVisit;

	const alertText = (error?.message && `Error: ${error?.message}`) || 'Start by searching.';

	function handleSearch(name: string, value: string) {
		setSearch(search => ({...search, [name]: value}));
	}

	React.useEffect(() => {
		const timer = setTimeout(() => {
			const duplicateSearch = (
				search.q === prevSearch.current.q &&
				search.type === prevSearch.current.type
			);

			if (search.q === '' || duplicateSearch)
				return;

			setIsLoading(true);

			if (search.type === 'user') {
				userService
					.getAllUsersByname(search.q)
					.then(data => setItems({type: search.type, data: data.items}))
					.catch(error => setError(error))
					.finally(() => {
						setIsLoading(false);
						prevSearch.current = search;
					});
			} else {
				repositoryService
					.getAllReposByName(search.q)
					.then(data => setItems({type: search.type, data: data.items}))
					.catch(error => setError(error))
					.finally(() => {
						setIsLoading(false);
						prevSearch.current = search;
					});
			}
		}, 900);
		return () => clearTimeout(timer);
	}, [search]);


	return (
		<>
			<DiscoverHeader search={search} onSearch={handleSearch} />
			<Container>
				{shouldShowAlert && <AlertBox>{alertText}</AlertBox>}

				{isLoading
					? <Spinner />
					: isEmptyList
						?	<AlertBox>No results found for "{search.q}".</AlertBox>
						:	items?.data?.map(item => <Card data={item} />)
				}

			</Container>
			<Route path="/discover/user/:userName">
				<UserDiscover />
			</Route>
			<Footer />
		</>
	)
}

type searchObj = {
	type: string,
	q: string
}

function DiscoverHeader(
	{search, onSearch}: {search: searchObj, onSearch: any}
) {

	const searchTypeDisplay = search.type === 'repo'
		? 'Repositories'
		: 'Usernames';

	function handleSearchChange(event: any) {
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