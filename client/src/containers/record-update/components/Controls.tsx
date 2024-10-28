import React, { memo } from 'react';
import { Button } from '@mui/material';
import type { MouseEvent } from 'react';
import { LoadingButton } from '@mui/lab';

type Props = {
    isUpdate?: boolean;
    isLoading?: boolean;
    onClose: (e: MouseEvent) => void;
}

const Controls = memo(({ isUpdate, isLoading = false, onClose }: Props) => (
    <React.Fragment>
        <LoadingButton type='submit' form='update-record-form' loading={isLoading}>
            {isUpdate ? 'Update' : 'Add'}
        </LoadingButton>
        <Button onClick={onClose}>
            Close
        </Button>
    </React.Fragment>
));

export default Controls;