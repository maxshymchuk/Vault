import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import { setAuthenticated } from '../redux';
import type { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';

// temporal solution, in prod must work via cookies
async function giveAccess(
    query: Promise<{ data: { token: string } }>,
    dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
) {
    try {
        const { data } = await query;
        dispatch(setAuthenticated(data.token));
    } catch {
        dispatch(setAuthenticated(undefined));
    }
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${config.baseUrl}/api/auth/`,
        // credentials: 'include'
    }),
    endpoints: (builder) => ({
        signUp: builder.mutation<{ token: string }, { email: string; password: string }>({
            query: (creds) => ({
                url: 'sign-up',
                method: 'POST',
                body: creds,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => await giveAccess(queryFulfilled, dispatch),
        }),
        signIn: builder.mutation<{ token: string }, { email: string; password: string }>({
            query: (creds) => ({
                url: 'sign-in',
                method: 'POST',
                body: creds,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => await giveAccess(queryFulfilled, dispatch),
        }),
        checkAuth: builder.query<unknown, void>({
            query: () => '/check',
        }),
    }),
});

export const { useSignUpMutation, useSignInMutation, useCheckAuthQuery } = authApi;

export const { endpoints, reducerPath, reducer, middleware } = authApi;
