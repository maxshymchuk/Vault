import { Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { login } from '../../redux';
import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch } from '../../redux/store';

export default function AuthDialog() {
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
        <Dialog open={true}>
            <DialogTitle>
                Who are you?
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1} width={{ xs: 'auto', sm: '40ch' }}>
                    <TextField
                        variant='outlined'
                        label='Username'
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
        </Dialog>
    );
}