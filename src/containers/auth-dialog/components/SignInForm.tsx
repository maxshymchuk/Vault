import React from 'react';
import { DialogActions, DialogContent, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { SimpleInput } from '../../../components';
import { signIn, RootState, useAppDispatch } from '../../../redux';
import { useSelector } from 'react-redux';
import { Status } from '../../../constants/config';
import TEMP_InProgress from './TEMP_InProgress';

export default function SignInForm() {
    const dispatch = useAppDispatch();

    const { status } = useSelector((state: RootState) => state.auth);

    const handleClick = () => {
        dispatch(signIn({ username: '', password: '' }));
    };

    return (
        <React.Fragment>
            {/* Temp styling while in progress */}
            <DialogContent sx={{ position: 'relative' }}>
                <Stack spacing={2} width={{ xs: 'auto', sm: '40ch' }}>
                    <SimpleInput label='Username or Email' disabled />
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
                <LoadingButton loading={status === Status.Loading} onClick={handleClick}>
                    Sign In
                </LoadingButton>
            </DialogActions>
        </React.Fragment>
    );
}