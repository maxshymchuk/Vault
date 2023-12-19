import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.timeout = 30_000;
axios.defaults.withCredentials = true;

export const mock = new MockAdapter(axios, { delayResponse: 100 });