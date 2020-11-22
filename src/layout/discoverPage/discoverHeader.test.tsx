import React from 'react';
import renderWithStoreAndRouter from 'utils/render';
import { fireEvent } from '@testing-library/react';
import DiscoverHeader from './discoverHeader';

describe('discover page', () => {
	test('can change search type', () => {
		const searchParam: SearchObj = {
			q: 'person',
			type: 'repo'
		};
		const searchCallback = jest.fn();
		const { getByRole } = renderWithStoreAndRouter(
			<DiscoverHeader
				search={searchParam}
				onSearch={searchCallback} />
		);

		const select = getByRole('combobox');
		const name = 'type';
		const value = 'user';
		fireEvent.change(select, {
			target: { name, value }
		});
		expect(searchCallback).toBeCalledWith(name, value);
	});
})