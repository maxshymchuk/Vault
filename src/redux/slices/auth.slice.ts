import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Auth } from '../types';
import Endpoints from '../../services/endpoints';
import { authLogin } from '../../services/auth.service';

type Login = {
    token: string;
}

const initialState: Auth = {
    user: {
        nickname: 'Username'
    },
    token: null,
    isLogged: false,
};

const login = createAsyncThunk<Login, { username: string, password: string }>(Endpoints.Post.SignIn, async ({ username, password }) => {
    const response = await authLogin(username, password);
    return response as Login;
    // return (await response.json()) as Login;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLogged = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.token = payload.token;
            state.isLogged = true;
        });
    }
});

export { login };
export const { logout } = authSlice.actions;

export default authSlice.reducer;