import React, { memo } from 'react';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export type Props = {
    isLoading?: boolean;
    onResolve?: () => void;
    onReject?: () => void;
}

const Controls = memo(({ isLoading, onResolve, onReject }: Props) => (
    <React.Fragment>
        {onResolve && (
            <LoadingButton onClick={onResolve} loading={isLoading}>
                Yes
            </LoadingButton>
        )}
        {onReject && (
            <Button onClick={onReject}>
                No
            </Button>
        )}
    </React.Fragment>
));

export default Controls;