import React from 'react';
import render from 'utils/render';
import RepoCard from '../userCard';

describe('<RepoCard />', () => {
	test('match snapshot', () => {
		const { asFragment } = render(<RepoCard data={{
			avatar_url: 'avatar_url',
			login: 'login',
			html_url: 'html_url',
			id: 'id'
		}} />);
		expect(asFragment()).toMatchSnapshot();
	});
})