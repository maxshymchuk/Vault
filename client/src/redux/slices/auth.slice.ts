import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setLocalStorage } from '../../utils';

type AuthState = {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated(state, { payload }: PayloadAction<string | undefined>) {
            setLocalStorage('token', payload);
            state.isAuthenticated = !!payload;
        },
    },
});

export default authSlice;
export const { setAuthenticated } = authSlice.actions;
export type { AuthState };