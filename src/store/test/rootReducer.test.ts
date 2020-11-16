import { addBookmark, renameBookmark, removeBookmark } from 'store/actionCreators';
import reducer from '../rootReducer';

import repo from 'services/dummyRepo';

describe('reducers', () => {
	test('add bookmark', () => {
		const state = reducer(undefined, addBookmark(repo));
		expect(state.bmkById).toEqual(expect.arrayContaining([repo.id]));
		expect(state.repos[repo.id]).toEqual(expect.objectContaining(repo));
	});

	test('rename bookmark', () => {
		const newName = 'new name';
		const initState = {bmkById: [repo.id], repos: { [repo.id]: repo}};
		const state = reducer(initState, renameBookmark(repo.id, newName));
		expect(state.repos[repo.id].displayName).toEqual(newName);
	});

	test('remove bookmark', () => {
		const initState = {bmkById: [repo.id], repos: { [repo.id]: repo}};
		// TODO: should change this to a Jest.mock
		Object.defineProperty(Object, 'fromEntries', {
			get: () => (entries: [string, any]) => {
				const res: {[_: string]: any} = {};
				for (let [key, value] of entries) {
					res[key] = value;
				}
				return res;
			}
		});
		const state = reducer(initState, removeBookmark(repo.id));
		expect(state.bmkById).not.toEqual(expect.arrayContaining([repo.id]));
		expect(state.repos[repo.id]).not.toEqual(expect.objectContaining(repo));
	})
})