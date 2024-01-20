import React, { memo } from 'react';
import { Button } from '@mui/material';
import type { MouseEvent } from 'react';

type Props = {
    isUpdate?: boolean;
    onClose: (e: MouseEvent) => void;
}

const Controls = memo(({ isUpdate, onClose }: Props) => (
    <React.Fragment>
        <Button type='submit' form='update-record-form'>
            {isUpdate ? 'Update' : 'Add'}
        </Button>
        <Button onClick={onClose}>
            Close
        </Button>
    </React.Fragment>
));

export default Controls;