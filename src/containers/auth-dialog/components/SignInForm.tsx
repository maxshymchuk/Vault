import { DialogActions, DialogContent, Stack, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState } from 'react';
import { login } from '../../../redux';
import { useAppDispatch } from '../../../redux/store';

export default function SignInForm() {
    const dispatch = useAppDispatch();

    const [isLoading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        const result = await dispatch(login({ username: '', password: '' }));
        if (login.fulfilled.match(result)) {
            console.log(result.payload);
            setLoading(false);
        }
    };

    return (
        <>
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
                <LoadingButton loading={isLoading} onClick={handleClick}>
                    Login
                </LoadingButton>
            </DialogActions>
        </>
    );
}