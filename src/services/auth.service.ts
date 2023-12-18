import { mock } from './api';
import Endpoints from './endpoints';
import axios from 'axios';

export async function authLogin(username: string, password: string) {
    const response = await axios.post(Endpoints.Post.SignIn, { username, password });
    if (response.status === 200) {
        return response.data;
    } else {
        return null;
    }
}

mock.onPost(Endpoints.Post.SignIn).reply(200, { token: 'token' });
