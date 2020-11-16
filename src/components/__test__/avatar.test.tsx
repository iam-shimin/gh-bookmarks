import React from 'react';
import { render } from '@testing-library/react';

import Avatar from '../avatar';
import icon from 'assets/images/user-icon.png';

describe('<Avatar />', () => {

	test('render', () => {
		render(<Avatar src={icon} />);
	});

	test('shows fallback on img error', () => {
		const { queryByAltText } = render(<Avatar src="error-image" />);
		const avatarImg = queryByAltText(/Avatar/);
		const fallbackImg = queryByAltText(/fallback/);

		expect(avatarImg).not.toBeVisible();
		expect(fallbackImg).toBeVisible();
	})
})