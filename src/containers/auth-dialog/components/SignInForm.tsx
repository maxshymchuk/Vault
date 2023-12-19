import React from 'react';
import { DialogActions, DialogContent, Stack, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { signIn, RootState, useAppDispatch } from '../../../redux';
import { useSelector } from 'react-redux';
import { Status } from '../../../constants/config';

export default function SignInForm() {
    const dispatch = useAppDispatch();

    const { status } = useSelector((state: RootState) => state.auth);

    const handleClick = () => {
        dispatch(signIn({ username: '', password: '' }));
    };

    return (
        <React.Fragment>
            <DialogContent>
                <Stack spacing={2} width={{ xs: 'auto', sm: '40ch' }}>
                    <TextField
                        variant='outlined'
                        label='Username or Email'
                    />
                    <TextField
                        type='password'
                        variant='outlined'
                        autoComplete='current-password'
                        label='Password'
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <LoadingButton loading={status === Status.Loading} onClick={handleClick}>
                    Login
                </LoadingButton>
            </DialogActions>
        </React.Fragment>
    );
}