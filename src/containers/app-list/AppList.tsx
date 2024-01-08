import React, { useEffect } from 'react';
import { Collapse, Divider, List, Paper } from '@mui/material';
import { RootState, selectRecords, useAppDispatch } from '../../redux';
import { reload } from '../../redux';
import { useSelector } from 'react-redux';
import { Status } from '../../constants/config';
import { Record } from '../../components/record';
import Selector from './components/Selector';
import Loader from './components/Loader';
import Empty from './components/Empty';
import type { Props } from './types';
import type { VaultRecord } from '../../types';

export default function AppList({ onRecordClick }: Props) {
    const dispatch = useAppDispatch();

    const { records, filteredRecords, selectedRecords, search, status } = useSelector((state: RootState) => state.data);

    useEffect(() => {
        dispatch(reload());
    }, [dispatch]);

    const handleSelectAllRecords = () => {
        dispatch(selectRecords(selectedRecords.length === records.length ? [] : records));
    };

    const handleSelectRecord = (record: VaultRecord) => {
        dispatch(selectRecords(record));
    };

    if (search && filteredRecords.length === 0) return <Empty />;

    return (
        <Paper square>
            <Loader isLoading={status === Status.Loading} />
            <Collapse in={selectedRecords.length > 0}>
                <Selector
                    selected={selectedRecords.length}
                    full={records.length}
                    onClick={handleSelectAllRecords}
                />
            </Collapse>
            <List disablePadding>
                {filteredRecords.map((record, index) => (
                    <React.Fragment key={record.id}>
                        {index > 0 && <Divider />}
                        <Record
                            record={record}
                            isSelected={selectedRecords.map(r => r.id).includes(record.id)}
                            onSelect={handleSelectRecord}
                            onClick={onRecordClick}
                        />
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
}