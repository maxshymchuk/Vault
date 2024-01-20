import React, { memo } from 'react';
import { Button } from '@mui/material';
import type { MouseEvent } from 'react';

type Props = {
    onClose: (e: MouseEvent) => void;
}

const Controls = memo(({ onClose }: Props) => (
    <React.Fragment>
        <Button type='submit' form='update-record-form'>
            Add
        </Button>
        <Button onClick={onClose}>
            Close
        </Button>
    </React.Fragment>
));

export default Controls;