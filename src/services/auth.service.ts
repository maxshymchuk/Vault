import { mock } from './api';
import Endpoints from '../constants/endpoints';
import axios, { AxiosRequestConfig } from 'axios';

export async function postSignIn(username: string, password: string, config?: AxiosRequestConfig) {
    return await axios.post(Endpoints.Post.SignIn, { username, password }, config);
}

export async function postSignUp(username: string, email: string, password: string, config?: AxiosRequestConfig) {
    return await axios.post(Endpoints.Post.SignUp, { username, email, password }, config);
}

mock.onPost(Endpoints.Post.SignIn).reply(200, { token: 'token' });
