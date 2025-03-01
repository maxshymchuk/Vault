import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../config';
import { prepareHeadersWithToken, syncRecords } from './utils';

export const recordsApi = createApi({
    reducerPath: 'recordsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${config.baseUrl}/api/records/`,
        prepareHeaders: prepareHeadersWithToken,
        // credentials: 'include',
    }),
    endpoints: (builder) => ({
        get: builder.query<{ records: Array<VaultRecord> }, void>({
            query: () => '',
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                await syncRecords(queryFulfilled, dispatch);
            },
        }),
    }),
});

export const { useGetQuery } = recordsApi;

export const { endpoints, reducerPath, reducer, middleware } = recordsApi;
