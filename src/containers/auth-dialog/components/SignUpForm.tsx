import React from 'react';
import { DialogActions, DialogContent, Stack, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { signUp, RootState, useAppDispatch } from '../../../redux';
import { useSelector } from 'react-redux';
import { Status } from '../../../constants/config';

export default function SignUpForm() {
    const dispatch = useAppDispatch();

    const { status } = useSelector((state: RootState) => state.auth);

    const handleClick = async () => {
        dispatch(signUp({ username: '', email: '', password: '' }));
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
                        variant='outlined'
                        label='Email'
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