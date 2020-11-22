import React from 'react';
import { Route } from 'react-router-dom';
import renderWithStoreAndRouter from 'utils/render';
import UserDiscover from './userDiscover';
jest.mock('services/repos');

describe('<UserDiscoverModal />', () => {
	test('match snapshot', () => {
		const { asFragment } = renderWithStoreAndRouter(<UserDiscover />);
		expect(asFragment()).toMatchSnapshot();
	});

	test('open a user repo-list', async () => {
		const testUser = 'user-a';
		const element = (
			<Route path="/discover/user/:userName">
				<UserDiscover />
			</Route>
		);
		const rendererOptions = {
			routerProps: { initialEntries: [{
				pathname: `/discover/user/${testUser}`
			}] }
		};
		const { findByText, findAllByRole } = renderWithStoreAndRouter(element, rendererOptions);
		const modalTitle = await findByText(`GitHub Repositories of ${testUser}`);
		const result = await findAllByRole('heading');

		expect(modalTitle).toBeInTheDocument();
		expect(result.length).toEqual(2);
	})
});