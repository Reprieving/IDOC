import axios from 'axios';

let base = '/api';

export const requestLogin = params => { return axios.post(`${base}/adminLogin`, params).then(res => res.data); };