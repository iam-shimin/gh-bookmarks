import axios, { AxiosRequestConfig } from 'axios';

const baseUrl = 'https://api.github.com';

function getSearchParamFromLink(url: string, param = 'page') {
	let tmp: string | null = url.trim();
	if (tmp) {
		tmp = (new URLSearchParams(url.substr(1, url.length - 2))).get(param);
		if (tmp) {
			return parseInt(tmp);
		}
	}
	return null;
}

function parseLinkHeader(link = '') {
	if (link === '')
		return null;

	const links = Object.fromEntries(link.split(',').map(i => i.split('; ').reverse()));
	let next = getSearchParamFromLink(links["rel=\"next\""]);
	let prev = getSearchParamFromLink(links["rel=\"prev\""]);
	let first = getSearchParamFromLink(links["rel=\"first\""]);
	let last = getSearchParamFromLink(links["rel=\"last\""]);
	return {first, prev, next, last}
}

export default function get(url: string, options?: AxiosRequestConfig) {
	return axios
		.get(`${baseUrl}/${url}`, options)
		.then(response => ({data: response.data, links: parseLinkHeader(response.headers.link)}));
}