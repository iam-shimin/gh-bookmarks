import React from 'react';
import { render } from '@testing-library/react';
import Card from '../card';

test('<Card />', () => {
	const { asFragment } = render(<Card />);
	expect(asFragment()).toMatchSnapshot();
});