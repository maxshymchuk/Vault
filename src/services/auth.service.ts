import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '../constants/config';
import { setAuthenticated } from '../redux';
  
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${config.baseUrl}/api/auth/`,
        credentials: 'include'
     }),
    endpoints: builder => ({
        signUp: builder.mutation<string, { email: string; password: string }>({
            query: body => ({
                url: 'sign-up',
                method: 'POST',
                body,
            })
        }),
        signIn: builder.mutation<string, { email: string; password: string }>({
            query: body => ({
                url: 'sign-in',
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(setAuthenticated(true));
                } catch {
                    dispatch(setAuthenticated(false));
                }
            },
        }),
        checkAuth: builder.query<unknown, void>({
            query: () => '/check'
        }),
    }),
})

export const { useSignUpMutation, useSignInMutation, useCheckAuthQuery } = authApi;

export const { endpoints, reducerPath, reducer, middleware } = authApi