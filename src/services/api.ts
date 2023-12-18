import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.timeout = 30_000;
axios.defaults.withCredentials = true;

export default function authHeader() {
    const rawUser = localStorage.getItem('user');
    if (!rawUser) return {};
    const user = JSON.parse(rawUser);
    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}

export const mock = new MockAdapter(axios, { delayResponse: 1000 });