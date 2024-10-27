import { createAsyncThunk, createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import Endpoints from '../../constants/endpoints';
import { getRecords } from '../../services/data.service';
import { Status } from '../../constants/config';
import { RootState } from '../store';
import { VaultRecord, VaultRecordPublic } from '../../types';

type DataState = {
    records: Array<VaultRecord>;
    selectedRecords: Array<VaultRecord>;
    search: string;
    status: Status;
}

const initialState: DataState = {
    records: [],
    selectedRecords: [],
    search: '',
    status: Status.Idle
};

export const reload = createAsyncThunk(Endpoints.Get.GetAllRecords, async (arg, { getState }) => {
    const { auth } = getState() as RootState;
    const response = await getRecords({ headers: { Authorization: auth.token } });
    return response.data;
});

export const getFilteredRecords = createSelector(
    [
        (state: RootState) => state.data.records,
        (state: RootState) => state.data.search
    ],
    (records, search) => {
        return records.filter(record => {
            const { title, description } = record;
            return [title, description]
                .map(str => str?.toLowerCase())
                .some(str => str?.includes(search.toLowerCase()));
        });
    }
);

function filterRecords(records: Array<VaultRecord>, recordsToRemove: Array<VaultRecord> | VaultRecord) {
    if (Array.isArray(recordsToRemove)) {
        return records.filter(record => !recordsToRemove.map(r => r.id).includes(record.id));
    } else {
        return records.filter(record => record.id !== recordsToRemove.id);
    }
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSearch: (state, { payload }: PayloadAction<string>) => {
            state.search = payload;
        },
        addRecord: (state, { payload }: PayloadAction<VaultRecordPublic>) => {
            state.records = [
                ...state.records,
                {
                    id: crypto.randomUUID(), // https only
                    title: payload.title,
                    description: payload.description,
                    hidden: payload.hidden,
                    createdAt: Date.now(),
                    changedAt: Date.now()
                }
            ];
        },
        updateRecord: (state, { payload }: PayloadAction<Pick<VaultRecord, 'id'> & VaultRecordPublic>) => {
            state.records = state.records.map(record => record.id === payload.id ? {
                id: record.id,
                title: payload.title,
                description: payload.description,
                hidden: payload.hidden,
                createdAt: record.createdAt,
                changedAt: Date.now()
            } : record);
        },
        removeRecords: (state, { payload }: PayloadAction<Array<VaultRecord> | VaultRecord>) => {
            state.records = filterRecords(state.records, payload);
            state.selectedRecords = filterRecords(state.selectedRecords, payload);
        },
        selectRecords: (state, { payload }: PayloadAction<Array<VaultRecord> | VaultRecord>) => {
            if (Array.isArray(payload)) {
                state.selectedRecords = payload;
            } else {
                const index = state.selectedRecords.findIndex(record => record.id === payload.id);
                if (index === -1) {
                    state.selectedRecords = [...state.selectedRecords, payload];
                } else {
                    state.selectedRecords = state.selectedRecords.filter(record => record.id !== payload.id);
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(reload.pending, (state) => {
            state.status = Status.Loading;
        });
        builder.addCase(reload.fulfilled, (state, { payload }) => {
            state.records = payload ?? [];
            state.status = Status.Success;
        });
        builder.addCase(reload.rejected, (state) => {
            state.records = [];
            state.status = Status.Fail;
        });
    }
});

export default dataSlice;
export const { setSearch, addRecord, updateRecord, removeRecords, selectRecords } = dataSlice.actions;
export type { DataState };