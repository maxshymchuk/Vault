import React from 'react';
import { Collapse, Divider, List, Paper } from '@mui/material';
import { RootState, selectRecords, useAppDispatch } from '../../redux';
import { useSelector } from 'react-redux';
import Selector from './components/Selector';
import Loader from './components/Loader';
import Empty from './components/Empty';
import { useModal } from '../../utils/hooks';
import { getFilteredRecords } from '../../redux/slices/records.slice';
import { Record, SimpleQuestion } from '../../components';
import { RecordPreview } from '../record-preview';
import { RecordUpdate } from '../record-update';
import { useRemoveMutation, useUpdateMutation } from '../../services/record.service';
import { useGetQuery } from '../../services/records.service';
import { isVaultRecord } from '../../utils';

export default function AppList() {
    const dispatch = useAppDispatch();

    const { isFetching } = useGetQuery(undefined, { refetchOnMountOrArgChange: true });

    const [updateRecord, { isLoading: isUpdatePending }] = useUpdateMutation();
    const [removeRecord, { isLoading: isRemovePending }] = useRemoveMutation();

    const filteredRecords = useSelector(getFilteredRecords);
    const { selectedRecords } = useSelector((state: RootState) => state.records);

    const notificationModal = useModal<VaultRecord>();
    const previewRecordModal = useModal<VaultRecord>();
    const updateRecordModal = useModal<VaultRecord>();

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

    const handleRecordUpdate = (record: VaultRecord | VaultRecordPending) => {
        if (!updateRecordModal.content) return;
        if (!isVaultRecord(record)) return;
        updateRecord(record).unwrap().then(() => updateRecordModal.hide());
    };

    const handleRecordRemove = () => {
        if (!notificationModal.content) return;
        removeRecord(notificationModal.content.id).unwrap().then(() => notificationModal.hide());
    };

    if (isFetching) return <Loader isLoading={isFetching} />;

    if (filteredRecords.length === 0) return <Empty />;

    return (
        <Paper square>
            <SimpleQuestion
                open={notificationModal.isOpen}
                title='Delete record'
                isLoading={isRemovePending}
                onResolve={handleRecordRemove}
                onReject={notificationModal.hide}
            >
                This can't be undone
            </SimpleQuestion>
            <RecordPreview
                open={previewRecordModal.isOpen}
                record={previewRecordModal.content}
                onClose={previewRecordModal.hide}
            />
            <RecordUpdate
                open={updateRecordModal.isOpen}
                record={updateRecordModal.content}
                isLoading={isUpdatePending}
                onUpdate={handleRecordUpdate}
                onClose={updateRecordModal.hide}
            />
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