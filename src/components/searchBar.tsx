import React from 'react';

import 'style/searchBar.css';

interface SearchBarProps extends React.HTMLProps<HTMLInputElement> {
	onSearch?: any
}

export default function SearchBar(
	{children, placeholder, onSearch, ...rest}: SearchBarProps
) {

	const searchField: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);

	React.useEffect(() => {
		searchField.current?.focus();
	}, []);

	function handleSearch(event: any) {
		const {value} = event.target;
		onSearch('q', value);
	}

	function handleSubmit(event: any) {
		event.preventDefault();
		const form = new FormData(event.target);
		onSearch('q', form.get('q'));
	}

	return (
		<form role="search" onSubmit={handleSubmit}>
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