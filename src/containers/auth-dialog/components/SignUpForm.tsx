import React from 'react';
import { DialogActions, DialogContent, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { SimpleInput } from '../../../components';
import { signUp, RootState, useAppDispatch } from '../../../redux';
import { useSelector } from 'react-redux';
import { Status } from '../../../constants/config';
import TEMP_InProgress from './TEMP_InProgress';

export default function SignUpForm() {
    const dispatch = useAppDispatch();

    const { status } = useSelector((state: RootState) => state.auth);

    const handleClick = async () => {
        dispatch(signUp({ username: '', email: '', password: '' }));
    };

    return (
        <React.Fragment>
            {/* Temp styling while in progress */}
            <DialogContent sx={{ position: 'relative' }}>
                <Stack spacing={2} width={{ xs: 'auto', sm: '40ch' }}>
                    <SimpleInput label='Username or Email' disabled />
                    <SimpleInput label='Email' disabled />
                    <SimpleInput
                        type='password'
                        label='Password'
                        autoComplete='current-password'
                        disabled
                    />
                </Stack>
                <TEMP_InProgress />
            </DialogContent>
            <DialogActions>
                <LoadingButton loading={status === Status.Loading} onClick={handleClick} disabled>
                    Sign Up
                </LoadingButton>
            </DialogActions>
        </React.Fragment>
    );
}