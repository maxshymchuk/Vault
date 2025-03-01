import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setLocalStorage } from '../../utils';

type AuthState = {
    isAuthenticated: boolean;
};

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

const { setAuthenticated } = authSlice.actions;

export default authSlice;

export { setAuthenticated };

export type { AuthState };
