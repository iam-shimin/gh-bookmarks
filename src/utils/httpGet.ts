import axios, { AxiosRequestConfig } from 'axios';

const baseUrl = 'https://api.github.com';

export default function get(url: string, options?: AxiosRequestConfig) {
	return axios
		.get(`${baseUrl}/${url}`, options)
		.then(response => response.data);
}