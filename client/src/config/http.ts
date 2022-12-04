import axios from 'axios';

import { API } from '../constants/env';

type method = 'get' | 'post' | 'patch';

const request = <T>(url: string, method: method, body?: any) => axios(url, {
    method,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
    data: body,
	baseURL: API
})
	.then(
		response => response.data as T,
		error => {throw new Error(JSON.stringify(error.response.data))}
	);

export const httpClient = {
    get: <T>(url: string) => request<T>(url, 'get'),
    post: <T>(url: string, body: any) => request<T>(url, 'post', body),
    patch: <T>(url: string) => request<T>(url, 'patch'),
};
