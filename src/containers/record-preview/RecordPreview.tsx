import React, { memo } from 'react';
import { Button, FormControl, Stack } from '@mui/material';
import { SimpleDialog } from '../../components/simple-dialog';
import type { Props } from './types';

const RecordPreview = memo(({ isOpen, record, onClose }: Props) => {
    if (!record) return null;

    return (
        <SimpleDialog
            isOpen={isOpen}
            title={record.title}
            actions={(
                <Button autoFocus onClick={onClose}>
                    Close
                </Button>
            )}
        >
            <Stack spacing={2}>
                <FormControl>
                    Preview
                </FormControl>
            </Stack>
        </SimpleDialog>
    );
});

export default RecordPreview;