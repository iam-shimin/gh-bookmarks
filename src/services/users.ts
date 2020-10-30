import get from 'utils/httpGet';

function getAllUsersByname(name: string, page = 1) {
	return get('search/users', {params: {q: name, page, per_page: 20}});
}

export default {
	getAllUsersByname
}