import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MemoryRouterProps } from 'react-router';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { Store } from 'redux';
import store from 'store';

// Test render

export default function renderWithStoreAndRouter(
	element: React.ReactElement,
	options?: { injectedStore?: Store<BookmarkState, BookmarkAction>, routerProps?: MemoryRouterProps }
) {
	const storeToBeUsed = options?.injectedStore || store;
	return render(
		<MemoryRouter {...options?.routerProps}>
			<Provider store={storeToBeUsed}>{element}</Provider>
		</MemoryRouter>
	);
}