import React from 'react';
import renderWithStoreAndRouter from 'utils/render';
import UserDiscover from './userDiscover';

describe('<UserDiscoverModal />', () => {
	test('match snapshot', () => {
		const { asFragment } = renderWithStoreAndRouter(<UserDiscover />);
		expect(asFragment()).toMatchSnapshot();
	});
});