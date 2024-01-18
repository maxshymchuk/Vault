import React, { memo } from 'react';
import { Button } from '@mui/material';

export type Props = {
    onResolve?: () => void;
    onReject?: () => void;
}

const Controls = memo(({ onResolve, onReject }: Props) => (
    <React.Fragment>
        {onResolve && (
            <Button onClick={onResolve}>
                Yes
            </Button>
        )}
        {onReject && (
            <Button onClick={onReject}>
                No
            </Button>
        )}
    </React.Fragment>
));

export default Controls;