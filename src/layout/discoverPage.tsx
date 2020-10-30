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
import Pagination from 'components/pagination';
import Footer from 'components/footer';

import repositoryService from 'services/repos';
import userService from 'services/users';

type SearchObj = {
	type: string,
	q: string
}

export default function DiscoverPage() {
	const [items, setItems] = React.useState<Items>({
		type: 'repo',
		data: null
	});

	const [search, setSearch] = React.useState<SearchObj>({
		type: 'repo',
		q: ''
	});

	const [page, setPage] = React.useState<Page>({
		current: 1,
		next: 1,
		last: 1
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
	const alertType = error?.message ? 'danger': 'primary';

	const pageToRender = page.current;

	function handleSearch(name: string, value: string) {
		if (search.type !== name) {
			setPage(p => ({...p, current: 1}));
		}
		setSearch(search => ({...search, [name]: value}));
	}

	React.useEffect(() => {
		const timeToWait = pageToRender === 1? 900: 0;
		const timer = setTimeout(() => {

			if (search.q === '')
				return;

			setIsLoading(true);
			setError(null);

			async function fetchData() {
				if (search.type === 'user') {
					return userService.getAllUsersByname(search.q, pageToRender);
				}
				return repositoryService.getAllReposByName(search.q, pageToRender);
			}

			fetchData()
				.then(data => {
					setItems({type: search.type, data: data.data.items});
					setPage(p => ({...p, ...data.links}));
				})
				.catch(error => {console.log(error); setError(error)})
				.finally(() => {
					setIsLoading(false);
					prevSearch.current = search;
				})
		}, timeToWait);
		return () => clearTimeout(timer);
	}, [search, pageToRender]);


	return (
		<>
			<DiscoverHeader search={search} onSearch={handleSearch} />
			<Container>
				{shouldShowAlert && <AlertBox variant={alertType}>{alertText}</AlertBox>}

				{isLoading
					? <Spinner />
					: isEmptyList
						?	<AlertBox>No results found for "{search.q}".</AlertBox>
						: (
							<>
								{items?.data?.map(item => <Card key={item.id} data={item} />)}
								<Pagination
									page={page}
									onNext={() => setPage(p => ({...p, current: p.current + 1}))}
									onPrev={() => setPage(p => ({...p, current: p.current - 1}))} />
							</>
						)
				}

			</Container>
			<Route path="/discover/user/:userName">
				<UserDiscover />
			</Route>
			<Footer />
		</>
	)
}

type DiscoverHeaderProps = {
	search: SearchObj,
	onSearch: SearchCallback
}

function DiscoverHeader(
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