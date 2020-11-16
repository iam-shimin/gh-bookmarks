import React from 'react';
import { render } from '@testing-library/react';
import Spinner from '../spinner';

test('<Spinner />', () => {
	const { asFragment } = render(<Spinner />);
	expect(asFragment()).toMatchSnapshot();
});