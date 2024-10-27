import React from 'react';
import { DialogActions, DialogContent, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { SimpleInput } from '../../../components';
import { useSignUpMutation } from '../../../services/auth.service';
import { Controller, useForm } from 'react-hook-form';

export default function SignUpForm() {
    const [signUp, { isLoading }] = useSignUpMutation()

    const { control, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = handleSubmit(data => signUp(data));

    return (
        <React.Fragment>
            <DialogContent>
                <form id='sign-up-form' onSubmit={onSubmit}>
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
                                <SimpleInput 
                                    label='Password' 
                                    helperText={errors.password?.message}
                                    error={!!errors.password}
                                    hidden
                                    {...field}
                                />
                            )}
                        />
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions>
                <LoadingButton type='submit' form='sign-up-form' loading={isLoading}>
                    Sign Up
                </LoadingButton>
            </DialogActions>
        </React.Fragment>
    );
}