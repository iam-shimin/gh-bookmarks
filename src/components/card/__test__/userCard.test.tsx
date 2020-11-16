import React from 'react';
import render from 'utils/render';
import UserCard from '../userCard';

test('<Card />', () => {
	const { asFragment } = render(<UserCard data={{
		avatar_url: 'avatar_url',
		login: 'login',
		html_url: 'html_url',
		id: 'id'
	}} />);
	expect(asFragment()).toMatchSnapshot();
});