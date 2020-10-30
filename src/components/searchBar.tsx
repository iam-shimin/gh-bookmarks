import React from 'react';

import 'style/searchBar.css';

type FormEntryValue = string | null;

interface SearchBarProps extends React.HTMLProps<HTMLInputElement> {
	onSearch: SearchCallback
}

export default function SearchBar(
	{children, placeholder, onSearch, ...rest}: SearchBarProps
) {

	const searchField: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);

	React.useEffect(() => {
		searchField.current?.focus();
	}, []);

	function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
		const {value} = event.target;
		onSearch('q', value);
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = new FormData(event.target as HTMLFormElement);
		onSearch('q', form.get('q') as FormEntryValue);
	}

	return (
		<form className="searchbar" role="search" onSubmit={handleSubmit}>
			<input
				type="search"
				name="q"
				ref={searchField}
				placeholder={placeholder}
				aria-label={placeholder}
				onChange={handleSearch}
				{...rest} />

			{children}

			<button className="btn-plain btn-search">
				<span role="img" aria-label="Search">🔍</span>
			</button>
		</form>
	);
}