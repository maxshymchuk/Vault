import React, { useEffect } from 'react';
import { Collapse, Divider, List, Paper } from '@mui/material';
import { removeRecords, RootState, selectRecords, useAppDispatch } from '../../redux';
import { reload } from '../../redux';
import { useSelector } from 'react-redux';
import { Status } from '../../constants/config';
import { Record } from '../../components/record';
import Selector from './components/Selector';
import Loader from './components/Loader';
import Empty from './components/Empty';
import { useModal } from '../../utils/hooks';
import { getFilteredRecords } from '../../redux/slices/data.slice';
import { SimpleQuestion } from '../../components/simple-question';
import { RecordPreview } from '../record-preview';
import { RecordUpdate } from '../record-update';
import type { VaultRecord } from '../../types';

export default function AppList() {
    const dispatch = useAppDispatch();

    const filteredRecords = useSelector(getFilteredRecords);
    const { selectedRecords, search, status } = useSelector((state: RootState) => state.data);

    const notification = useModal<VaultRecord>();
    const previewRecord = useModal<VaultRecord>();
    const updateRecord = useModal<VaultRecord>();

    useEffect(() => {
        dispatch(reload());
    }, [dispatch]);

    const handleSelectAllRecords = () => {
        dispatch(selectRecords(selectedRecords.length === filteredRecords.length ? [] : filteredRecords));
    };

    const handleSelectRecord = (record: VaultRecord) => {
        dispatch(selectRecords(record));
    };

    const handleEditRecord = (record: VaultRecord) => {
        updateRecord.show(record);
    };

    const handleDeleteRecord = (record: VaultRecord) => {
        notification.show(record);
    };

    const removeRecord = () => {
        if (!notification.content) return;
        dispatch(removeRecords(notification.content));
        notification.hide();
    };

    if (search && filteredRecords.length === 0) return <Empty />;

    return (
        <Paper square>
            <SimpleQuestion
                isOpen={notification.isOpen}
                title='Are you sure?'
                onResolve={removeRecord}
                onReject={notification.hide}
            >
                Record &quot;{notification.content?.title}&quot; will be removed
            </SimpleQuestion>
            <RecordPreview
                isOpen={previewRecord.isOpen}
                record={previewRecord.content}
                onClose={previewRecord.hide}
            />
            <RecordUpdate
                isOpen={updateRecord.isOpen}
                record={updateRecord.content}
                onSubmit={() => console.log('SUBMIT')}
                onClose={updateRecord.hide}
            />
            <Loader isLoading={status === Status.Loading} />
            <Collapse in={selectedRecords.length > 0}>
                <Selector
                    selected={selectedRecords.length}
                    full={filteredRecords.length}
                    onClick={handleSelectAllRecords}
                />
            </Collapse>
            <List disablePadding>
                {filteredRecords.map((record, index) => (
                    <React.Fragment key={record.id}>
                        {index > 0 && <Divider />}
                        <Record
                            record={record}
                            buttons={[
                                { title: 'Edit', action: handleEditRecord },
                                { title: 'Delete', action: handleDeleteRecord }
                            ]}
                            isSelected={selectedRecords.map(r => r.id).includes(record.id)}
                            onSelect={handleSelectRecord}
                            onClick={previewRecord.show}
                        />
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
}