import React from 'react';

import 'style/searchBar.css';

export default function SearchBar(
	props: React.HTMLProps<HTMLInputElement>
) {

	const searchField: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);
	const {children, placeholder, ...rest} = props;

	React.useEffect(() => {
		searchField.current?.focus();
	})

	return (
		<form>
			<input
				type="search"
				name="q"
				ref={searchField}
				placeholder={placeholder}
				aria-label={placeholder}
				{...rest} />

			{children}
			
			<button className="btn-plain">
				<span role="img" aria-label="Search">🔍</span>
			</button>
		</form>
	);
}