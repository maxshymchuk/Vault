import { Stack, styled } from '@mui/material';

export const StyledStack = styled(Stack)(({ theme }) => ({
    position: 'fixed',
    maxWidth: '30%',
    left: '50%',
    transform: 'translateX(-50%)',
    top: theme.spacing(1),
    zIndex: theme.zIndex.snackbar
}));