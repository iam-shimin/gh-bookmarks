import {
	addBookmark,
	removeBookmark,
	renameBookmark
} from '../actionCreators';

describe('ActionCreators', () => {
	test('add bookmark', () => {
		const user = {
			login: 'login',
			id: 'id',
			avatar_url: 'avatar_url',
			html_url: 'html_url'
		};

		const action = addBookmark({
				id: 'id',
				name: 'name',
				html_url: 'html_url',
				owner: user,
				full_name: 'full_name',
				displayName: 'displayName',
				description: 'description'
		});

		expect(action).toMatchSnapshot();
	});

	test('remove Bookmark', () => {
		const action = removeBookmark('id');
		expect(action).toMatchSnapshot();
	});

	test('rename bookmark', () => {
		const action = renameBookmark('id', 'newName');
		expect(action).toMatchSnapshot();
	})
})