import React from 'react';
import userEvent from '@testing-library/user-event';
import { createStore } from 'redux';

import rootReducer from 'store/rootReducer';
import BookmarksPage from './bookmarksPage';
import renderWithStoreAndRouter from 'utils/render';
import dummyRepo from 'services/dummyRepo';

describe('<BookmarksPage>', () => {
	test('render', () => {
		renderWithStoreAndRouter(<BookmarksPage />)
	});

	test('search works', () => {
		const text = 'renamed';
		const store = createStore(
			rootReducer,
			{
				bmkById: [dummyRepo.id, 'abc'],
				repos: {
					[dummyRepo.id]: {...dummyRepo, displayName: 'patch'},
					abc: { ...dummyRepo, id: 'abc', displayName: text}
				}
			}
		);
		const { getByRole } = renderWithStoreAndRouter(<BookmarksPage />, store);
		const txtBox = getByRole('searchbox');
		userEvent.type(txtBox, text);
		const firstLink = getByRole('link', { name: RegExp(text) });
		expect(firstLink).toBeInTheDocument();
	});
})