import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithStoreAndRouter from 'utils/render';
import DiscoverPage from './discoverPage';
// import repoService from 'services/repos';
jest.mock('services/repos');

describe('<DiscoverPage />', () => {
	test('match snapshot', () => {
		const { asFragment } = renderWithStoreAndRouter(<DiscoverPage />);
		expect(asFragment()).toMatchSnapshot();
	});

	test('searchable', async () => {
		Object.defineProperty(Object, 'fromEntries', {
			get: () => (entries: [string, any]) => {
				const res: {[_: string]: any} = {};
				for (let [key, value] of entries) {
					res[key] = value;
				}
				return res;
			}
		});
		const { getByRole, findAllByRole } = renderWithStoreAndRouter(<DiscoverPage />);
		const txtBox = getByRole('searchbox');
		userEvent.type(txtBox, 'a');
		const results = await findAllByRole('heading');
		expect(results.length).toEqual(2);
	})
})