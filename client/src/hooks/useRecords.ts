import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux';
import * as recordsSlice from '../redux/slices/records.slice';

function useRecords() {
    const dispatch = useAppDispatch();

    const { records, search, selectedRecords } = useSelector((state: RootState) => state.records);
    const filteredRecords = useSelector(recordsSlice.filteredRecordsSelector);

    const updateSearch = useCallback((value: string) => {
        dispatch(recordsSlice.setSearch(value));
    }, []);

    const updateRecords = useCallback((records: Array<VaultRecord>) => {
        dispatch(recordsSlice.updateRecords(records));
    }, []);

    const selectRecords = useCallback((records: Array<VaultRecord> | VaultRecord) => {
        dispatch(recordsSlice.selectRecords(records));
    }, []);

    return useMemo(
        () => ({
            search,
            records,
            selectedRecords,
            filteredRecords,
            updateRecords,
            selectRecords,
            updateSearch,
        }),
        [search, records, selectedRecords, filteredRecords, updateRecords, selectRecords, updateSearch],
    );
}

export default useRecords;
