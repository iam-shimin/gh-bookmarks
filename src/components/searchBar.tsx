import React from 'react';

import 'style/searchBar.css';

export default function SearchBar({children}: {children?: any}) {

	const searchField: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);

	React.useEffect(() => {
		searchField.current?.focus();
	})

	return (
		<form>
			<input type="search" name="q" ref={searchField} />
			{children}
			<button className="btn-plain">
				<span role="img" aria-label="Search">🔍</span>
			</button>
		</form>
	);
}