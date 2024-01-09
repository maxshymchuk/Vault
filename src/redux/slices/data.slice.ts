import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Endpoints from '../../constants/endpoints';
import { getRecords } from '../../services/data.service';
import { Status } from '../../constants/config';
import { Data } from '../types';
import { RootState } from '../store';
import { VaultRecord } from '../../types';

const initialState: Data = {
    records: [],
    filteredRecords: [],
    selectedRecords: [],
    search: '',
    status: Status.Idle
};

export const reload = createAsyncThunk(Endpoints.Get.GetAllRecords, async (arg, { getState }) => {
    const { auth } = getState() as RootState;
    const response = await getRecords({ headers: { Authorization: auth.token } });
    return response.data;
});

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSearch: (state, { payload }: PayloadAction<string>) => {
            state.search = payload;
            state.filteredRecords = state.records.filter(record => {
                if (!payload) return record;
                const { title, description } = record;
                return [title, description]
                    .map(str => str?.toLowerCase())
                    .some(str => str?.includes(payload.toLowerCase()));
            });
        },
        selectRecords: (state, { payload }: PayloadAction<Array<VaultRecord> | VaultRecord>) => {
            if (Array.isArray(payload)) {
                state.selectedRecords = payload;
            } else {
                const index = state.selectedRecords.findIndex(_r => _r.id === payload.id);
                if (index === -1) {
                    state.selectedRecords = [...state.selectedRecords, payload];
                } else {
                    state.selectedRecords = state.selectedRecords.filter(r => r.id !== payload.id);
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
            state.filteredRecords = state.records;
            state.status = Status.Success;
        });
        builder.addCase(reload.rejected, (state) => {
            state.records = [];
            state.filteredRecords = state.records;
            state.status = Status.Fail;
        });
    }
});

export const { setSearch, selectRecords } = dataSlice.actions;

export default dataSlice.reducer;