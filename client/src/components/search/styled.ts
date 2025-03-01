import { alpha, InputBase, styled } from '@mui/material';

export const StyledRoot = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
}));

export const StyledIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    pointerEvents: 'none',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1),
    },
}));
