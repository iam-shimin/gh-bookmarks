import dummyRepo, { dummyResponse } from 'services/dummyRepo';

const dummyPaginationLinks = {
	first: 1,
	last: 7,
	next: 3,
	prev: 1
};

const dummyRepoCollection = [
	{...dummyRepo, id: 'a', name: 'a', full_name: 'a/a'},
	{...dummyRepo, id: 'b', name: 'a', full_name: 'b/a'}
];

const  getAllReposByName = jest.fn().mockImplementation(
	(_repoName: string, _page = 1) => dummyResponse(dummyRepoCollection, dummyPaginationLinks)
);

const getAllReposByUsername = jest.fn().mockImplementation(
	(userName: string, _page = 1) => {
		const dummyRepoCollection = [
			{...dummyRepo, id: 'a', name: 'a', full_name: `${userName}/a`},
			{...dummyRepo, id: 'b', name: 'b', full_name: `${userName}/b`}
		];
		return dummyResponse(dummyRepoCollection, dummyPaginationLinks).then(res => ({
			data: res.data.items,
			links: res.links
		}));
	}
);

export default {
	// getRepoByName,
	getAllReposByName,
	getAllReposByUsername
}