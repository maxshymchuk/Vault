import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import { prepareHeadersWithToken, syncRecords } from './utils';

export const recordApi = createApi({
    reducerPath: 'recordApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${config.baseUrl}/api/record/`,
        prepareHeaders: prepareHeadersWithToken,
        // credentials: 'include'
    }),
    endpoints: (builder) => ({
        add: builder.mutation<{ records: Array<VaultRecord> }, VaultRecordPending>({
            query: (record) => ({
                url: 'add',
                method: 'POST',
                body: record,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => await syncRecords(queryFulfilled, dispatch),
        }),
        remove: builder.mutation<{ records: Array<VaultRecord> }, string>({
            query: (id) => ({
                url: 'remove',
                method: 'DELETE',
                body: { id },
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => await syncRecords(queryFulfilled, dispatch),
        }),
        update: builder.mutation<{ records: Array<VaultRecord> }, VaultRecord>({
            query: (record) => ({
                url: 'update',
                method: 'PUT',
                body: record,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => await syncRecords(queryFulfilled, dispatch),
        }),
    }),
});

export const { useAddMutation, useRemoveMutation, useUpdateMutation } = recordApi;

export const { endpoints, reducerPath, reducer, middleware } = recordApi;
