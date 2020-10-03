import get from 'utils/httpGet';

function getRepoByName(ownerName: string, repoName: string, page = 1) {
	return get(`repos/${ownerName}/${repoName}`, {params: {page, per_page: 20}});
}

function getAllReposByName(repoName: string, page = 1) {
	return get('search/repositories', {
		params: {q: repoName, page, per_page: 20}
	})
}

function getAllReposByUsername(userName: string, page = 1) {
	return get(`users/${userName}/repos`, {params: {page, per_page: 20}});
}

export default {
	getRepoByName,
	getAllReposByName,
	getAllReposByUsername
}