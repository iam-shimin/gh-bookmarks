import axios from 'axios';
import get from '../httpGet';
jest.mock('axios');

describe('http `get`', () => {

	test('has pagination data from HTTP Header link', () => {
		// @ts-ignore
		axios.get.mockImplementationOnce(() => Promise.resolve({data: null, headers: {link: `<https://api.github.com/search/repositories?q=react&page=2&per_page=20>; rel="next", <https://api.github.com/search/repositories?q=react&page=50&per_page=20>; rel="last"`}}));
		Object.defineProperty(Object, 'fromEntries', {
			get: () => (entries: [string, any]) => {
				const res: {[_: string]: any} = {};
				for (let [key, value] of entries) {
					res[key] = value;
				}
				return res;
			}
		});
		return get('/').then(resp => {
			const linkKeys = Object.keys(resp.links);
			expect(linkKeys).toEqual(expect.arrayContaining(['next', 'last']));
		})
	});

	test('gives all null when link is not present', () => {
		// @ts-ignore
		axios.get.mockImplementationOnce(() => Promise.resolve({data: null, headers: {}}));
		return get('/').then(resp => {
			expect(resp.links).toEqual(expect.objectContaining({
				first: null,
				next: null,
				prev: null,
				last: null
			}));
		});
	})
})