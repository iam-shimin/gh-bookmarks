import userEvent from '@testing-library/user-event';
import React from 'react';
import render from 'utils/render';
import RepoCard from '../repoCard';

import repo from 'services/dummyRepo';

describe('<RepoCard />', () => {
	test('match snapshot', () => {
		const { asFragment } = render(<RepoCard data={repo} />);
		expect(asFragment()).toMatchSnapshot();
	});

	test('add bookmark', () => {
		const { getByRole } = render(<RepoCard data={repo} />);
		const bmkBtn = getByRole('button', { name: /add bookmark/i });
		userEvent.click(bmkBtn);
		expect(bmkBtn.textContent).toMatch(/remove bookmark/i);
	});

	test('rename bookmark', () => {
		const { getByRole } = render(<RepoCard data={repo} />);

		// bookmark already added in above test
		// TODO: make this side effect free

		// click rename
		const renameBtn = getByRole('button', { name: /rename/i });
		userEvent.click(renameBtn);

		// type rename text
		const text = 'renamed-text';
		const textBox = getByRole('textbox');
		userEvent.type(textBox, text);

		// click set button
		const setBtn = getByRole('button', { name: /set/i });
		userEvent.click(setBtn);

		// find the link
		const repoLink = getByRole('link');

		expect(repoLink.textContent).toEqual(text);
	})
})