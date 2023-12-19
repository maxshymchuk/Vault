import React, { memo } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

type Props = {
    isLoading: boolean;
}

const Loader = memo(({ isLoading }: Props) => (
    <Backdrop
        open={isLoading}
        invisible
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
    >
        <CircularProgress />
    </Backdrop>
));

export default Loader;