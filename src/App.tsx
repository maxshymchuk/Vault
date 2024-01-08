import React from 'react';
import { RecordPreview } from './containers/record-preview';
import RecordUpdate from './containers/record-update/RecordUpdate';
import { AppBar } from './containers/app-bar';
import { useSelector } from 'react-redux';
import { RootState } from './redux';
import { AuthDialog } from './containers/auth-dialog';
import { AppList } from './containers/app-list';
import { AppSnackbar } from './containers/app-snackbar';
import type { VaultRecord } from './types';
import useModal from './utils/hooks/useModal';

export default function App() {
    const { isLogged } = useSelector((state: RootState) => state.auth);

    const updateRecord = useModal<VaultRecord | undefined>();
    const previewRecord = useModal<VaultRecord>();

    const handleRecordAdd = () => {
        updateRecord.show(undefined);
    };

    const handleSubmit = () => {
        console.log('SUBMIT');
    };

    if (!isLogged) return <AuthDialog />;

    return (
        <React.Fragment>
            <RecordPreview
                isOpen={previewRecord.isOpen}
                record={previewRecord.content}
                onClose={previewRecord.hide}
            />
            <RecordUpdate
                isOpen={updateRecord.isOpen}
                record={updateRecord.content}
                onSubmit={handleSubmit}
                onClose={updateRecord.hide}
            />
            <AppSnackbar />
            <AppList onRecordClick={previewRecord.show} />
            <AppBar onRecordAdd={handleRecordAdd} />
        </React.Fragment>
    );
}