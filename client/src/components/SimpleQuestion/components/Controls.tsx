import React, { memo } from 'react';
import { Button } from '@mui/material';

export type Props = {
    isLoading?: boolean;
    onResolve?: () => void;
    onReject?: () => void;
};

const Controls = memo(({ isLoading, onResolve, onReject }: Props) => (
    <React.Fragment>
        {onResolve && (
            <Button onClick={onResolve} loading={isLoading}>
                Yes
            </Button>
        )}
        {onReject && <Button onClick={onReject}>No</Button>}
    </React.Fragment>
));

export default Controls;
