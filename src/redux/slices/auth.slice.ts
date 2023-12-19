import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Auth } from '../types';
import Endpoints from '../../constants/endpoints';
import { postSignIn, postSignUp } from '../../services/auth.service';
import { Status } from '../../constants/config';

type Login = {
    token: string;
}

const initialState: Auth = {
    user: {
        nickname: 'Username'
    },
    token: null,
    isLogged: true,
    status: Status.Idle
};

export const signIn = createAsyncThunk<Login, { username: string, password: string }>(Endpoints.Post.SignIn, async ({ username, password }) => {
    const response = await postSignIn(username, password);
    return response.data;
});

export const signUp = createAsyncThunk<Login, { username: string, email: string, password: string }>(Endpoints.Post.SignUp, async ({ username, email, password }) => {
    const response = await postSignUp(username, email, password);
    return response.data;
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
        builder.addCase(signIn.pending, (state) => {
            state.status = Status.Loading;
        });
        builder.addCase(signIn.fulfilled, (state, { payload }) => {
            state.token = payload.token;
            state.isLogged = true;
            state.status = Status.Success;
        });
        builder.addCase(signIn.rejected, (state) => {
            state.token = null;
            state.isLogged = false;
            state.status = Status.Fail;
        });
        builder.addCase(signUp.pending, (state) => {
            state.status = Status.Loading;
        });
        builder.addCase(signUp.fulfilled, (state, { payload }) => {
            state.token = payload.token;
            state.isLogged = true;
            state.status = Status.Success;
        });
        builder.addCase(signUp.rejected, (state) => {
            state.token = null;
            state.isLogged = false;
            state.status = Status.Fail;
        });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;