import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type RecordsState = {
    records: Array<VaultRecord>;
    selectedRecords: Array<VaultRecord>;
    search: string;
};

const initialState: RecordsState = {
    records: [],
    selectedRecords: [],
    search: '',
};

const filteredRecordsSelector = createSelector(
    [(state: RootState) => state.records.records, (state: RootState) => state.records.search],
    (records, search) => {
        return records.filter((record) => {
            const { title, description } = record;
            return [title, description]
                .map((str) => str?.toLowerCase())
                .some((str) => str?.includes(search.toLowerCase()));
        });
    },
);

// function filterRecords(records: Array<VaultRecord>, recordsToRemove: Array<VaultRecord> | VaultRecord) {
//     if (Array.isArray(recordsToRemove)) {
//         return records.filter((record) => !recordsToRemove.map((r) => r.id).includes(record.id));
//     } else {
//         return records.filter((record) => record.id !== recordsToRemove.id);
//     }
// }

const recordsSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        reset: () => initialState,
        updateRecords: (state, { payload }: PayloadAction<Array<VaultRecord>>) => {
            state.records = payload;
        },
        setSearch: (state, { payload }: PayloadAction<string>) => {
            state.search = payload;
        },
        selectRecords: (state, { payload }: PayloadAction<Array<VaultRecord> | VaultRecord>) => {
            if (Array.isArray(payload)) {
                state.selectedRecords = payload;
            } else {
                const index = state.selectedRecords.findIndex((record) => record.id === payload.id);
                if (index === -1) {
                    state.selectedRecords = [...state.selectedRecords, payload];
                } else {
                    state.selectedRecords = state.selectedRecords.filter((record) => record.id !== payload.id);
                }
            }
        },
    },
});

const { setSearch, selectRecords, updateRecords, reset } = recordsSlice.actions;

export default recordsSlice;

export {
    // selectors
    filteredRecordsSelector,
    // actions
    setSearch,
    selectRecords,
    updateRecords,
    reset,
};

export type { RecordsState };
