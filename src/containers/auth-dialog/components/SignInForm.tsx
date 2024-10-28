import React, { useEffect } from 'react';
import { DialogActions, DialogContent, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { InputHidden, SimpleInput } from '../../../components';
import { Controller, useForm } from 'react-hook-form';
import { useSignInMutation } from '../../../services/auth.service';

export default function SignInForm() {
    const [signIn, { isLoading }] = useSignInMutation()

    const { control, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = handleSubmit(data => signIn(data));

    return (
        <React.Fragment>
            <DialogContent>
                <form id='sign-in-form' onSubmit={onSubmit}>
                    <Stack spacing={2} width={{ xs: 'auto', sm: '40ch' }}>
                        <Controller
                            name='email'
                            control={control}
                            rules={{ required: 'Cannot be empty' }}
                            render={({ field }) => (
                                <SimpleInput 
                                    label='Email' 
                                    helperText={errors.email?.message}
                                    error={!!errors.email}
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name='password'
                            control={control}
                            rules={{ required: 'Cannot be empty' }}
                            render={({ field }) => (
                                <InputHidden 
                                    label='Password' 
                                    helperText={errors.password?.message}
                                    error={!!errors.password}
                                    {...field}
                                />
                            )}
                        />
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions>
                <LoadingButton type='submit' form='sign-in-form' loading={isLoading}>
                    Sign In
                </LoadingButton>
            </DialogActions>
        </React.Fragment>
    );
}