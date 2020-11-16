import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../searchBar';

describe('<SearchBar />', () => {

	test('can search as you type', () => {
		const search = jest.fn();
		const text = 'test';
		const { getByRole } = render(<SearchBar children={null} onSearch={search} />);
		const searchBox = getByRole('searchbox');
		userEvent.type(searchBox, text);
	
		expect(search).toBeCalledWith('q', text);
	});

	test('can click submit to search', async () => {
		const search = jest.fn();
		const text = 'test';
		const { getByRole } = render(<SearchBar children={null} onSearch={search} />);
		const searchButton = getByRole('button');

		class FormDataMock {
			get(_) {
				return _ === 'q' && text;
			}
		}

		global.FormData = FormDataMock;
		await userEvent.click(searchButton);

		expect(search).toBeCalledWith('q', text); // cannot read 'replace' of null
	});

});