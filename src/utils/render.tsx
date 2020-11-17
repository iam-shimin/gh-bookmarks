import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { Store } from 'redux';
import store from 'store';

// Test render

export default function renderWithStoreAndRouter(
	element: React.ReactElement,
	injectedStore?: Store<BookmarkState, BookmarkAction>
) {
	const storeToBeUsed = injectedStore || store;
	return render(
		<MemoryRouter>
			<Provider store={storeToBeUsed}>{element}</Provider>
		</MemoryRouter>
	);
}