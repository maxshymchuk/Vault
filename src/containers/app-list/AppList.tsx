import React, { useEffect } from 'react';
import { Collapse, Divider, List, Paper } from '@mui/material';
import { removeRecords, RootState, selectRecords, updateRecord, useAppDispatch } from '../../redux';
import { reload } from '../../redux';
import { useSelector } from 'react-redux';
import { Status } from '../../constants/config';
import Selector from './components/Selector';
import Loader from './components/Loader';
import Empty from './components/Empty';
import { useModal } from '../../utils/hooks';
import { getFilteredRecords } from '../../redux/slices/data.slice';
import { Record, SimpleQuestion } from '../../components';
import { RecordPreview } from '../record-preview';
import { RecordUpdate } from '../record-update';
import type { VaultRecord, VaultRecordPublic } from '../../types';

export default function AppList() {
    const dispatch = useAppDispatch();

    const filteredRecords = useSelector(getFilteredRecords);
    const { selectedRecords, search, status } = useSelector((state: RootState) => state.data);

    const notificationModal = useModal<VaultRecord>();
    const previewRecordModal = useModal<VaultRecord>();
    const updateRecordModal = useModal<VaultRecord>();

    useEffect(() => {
        dispatch(reload());
    }, [dispatch]);

    const handleRecordModal = (record: VaultRecord) => {
        updateRecordModal.show(record);
    };

    const handleNotificationModal = (record: VaultRecord) => {
        notificationModal.show(record);
    };

    const handleRecordsSelectAll = () => {
        dispatch(selectRecords(selectedRecords.length === filteredRecords.length ? [] : filteredRecords));
    };

    const handleRecordSelect = (record: VaultRecord) => {
        dispatch(selectRecords(record));
    };

    const handleRecordUpdate = (record: VaultRecordPublic) => {
        if (!updateRecordModal.content) return;
        dispatch(updateRecord({ id: updateRecordModal.content.id, ...record }));
        updateRecordModal.hide();
    };

    const handleRecordRemove = () => {
        if (!notificationModal.content) return;
        dispatch(removeRecords(notificationModal.content));
        notificationModal.hide();
    };

    if (search && filteredRecords.length === 0) return <Empty />;

    return (
        <Paper square>
            <SimpleQuestion
                isOpen={notificationModal.isOpen}
                title='Are you sure?'
                onResolve={handleRecordRemove}
                onReject={notificationModal.hide}
            >
                Record &quot;{notificationModal.content?.title}&quot; will be removed
            </SimpleQuestion>
            <RecordPreview
                isOpen={previewRecordModal.isOpen}
                record={previewRecordModal.content}
                onClose={previewRecordModal.hide}
            />
            <RecordUpdate
                isOpen={updateRecordModal.isOpen}
                record={updateRecordModal.content}
                onUpdate={handleRecordUpdate}
                onClose={updateRecordModal.hide}
            />
            <Loader isLoading={status === Status.Loading} />
            <Collapse in={selectedRecords.length > 0}>
                <Selector
                    selected={selectedRecords.length}
                    full={filteredRecords.length}
                    onClick={handleRecordsSelectAll}
                />
            </Collapse>
            <List disablePadding>
                {filteredRecords.map((record, index) => (
                    <React.Fragment key={record.id}>
                        {index > 0 && <Divider />}
                        <Record
                            record={record}
                            buttons={[
                                { title: 'Edit', action: handleRecordModal },
                                { title: 'Delete', action: handleNotificationModal }
                            ]}
                            isSelected={selectedRecords.map(r => r.id).includes(record.id)}
                            onSelect={handleRecordSelect}
                            onClick={previewRecordModal.show}
                        />
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
}