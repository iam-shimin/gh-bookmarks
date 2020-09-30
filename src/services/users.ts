import get from 'utils/httpGet';

function getAllUsersByname(name: string) {
	return get('search/users', {params: {q: name}});
}

export default {
	getAllUsersByname
}