import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { updateRecords } from '../redux';
import { getLocalStorage } from '../utils';

async function syncRecords(
    query: Promise<{ data: { records: Array<VaultRecord> } }>,
    dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
) {
    const { data } = await query;
    dispatch(updateRecords(data.records));
}

function prepareHeadersWithToken(headers: Headers) {
    const token = getLocalStorage().token;
    if (token) headers.set('Authorization', token);
    return headers;
}

export { prepareHeadersWithToken, syncRecords };
