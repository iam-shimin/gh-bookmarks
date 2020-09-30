import get from 'utils/httpGet';

function getRepoByName(ownerName: string, repoName: string) {
	return get(`repos/${ownerName}/${repoName}`);
}

function getAllReposByName(repoName: string) {
	return get('search/repositories', {
		params: {q: repoName}
	})
}

function getAllReposByUsername(userName: string) {
	return get(`users/${userName}/repos`);
}

export default {
	getRepoByName,
	getAllReposByName,
	getAllReposByUsername
}