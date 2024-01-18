import React, { useEffect, useState } from 'react';
import { Button, FormControl, Stack } from '@mui/material';
import { SimpleDialog, SimpleInput } from '../../components/simple-dialog';
import type { Props } from './types';
import type { VaultRecordPublic } from '../../types';

export default function RecordUpdate({ isOpen, record: externalRecord, onSubmit, onClose }: Props) {
    const [record, setRecord] = useState<VaultRecordPublic>({ title: '' });

    useEffect(() => {
        if (!externalRecord) return;
        setRecord(externalRecord);
    }, [externalRecord]);

    const handleRecordUpdate = () => {
        onSubmit(record);
    };

    return (
        <SimpleDialog
            isOpen={isOpen}
            title={externalRecord ? 'Update record' : 'New record'}
            actions={(
                <React.Fragment>
                    <Button autoFocus onClick={handleRecordUpdate}>
                        Add
                    </Button>
                    <Button onClick={onClose}>
                        Close
                    </Button>
                </React.Fragment>
            )}
        >
            <Stack spacing={2}>
                <FormControl>
                    <SimpleInput />
                    <SimpleInput />
                    <SimpleInput />
                </FormControl>
            </Stack>
        </SimpleDialog>
    );
}