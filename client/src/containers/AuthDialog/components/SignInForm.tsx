import React, { Fragment } from 'react';
import { Button, DialogActions, DialogContent, Stack } from '@mui/material';
import { InputHidden, SimpleInput } from '../../../components';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSignInMutation } from '../../../services/auth.service';

export default function SignInForm() {
    const [signIn, { isLoading }] = useSignInMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<{ email: string; password: string }>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<{ email: string; password: string }> = (data) => signIn(data);

    return (
        <Fragment>
            <DialogContent>
                <Stack
                    spacing={2}
                    sx={{
                        width: { xs: 'auto', sm: '40ch' },
                    }}
                >
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: 'Cannot be empty' }}
                        render={({ field }) => (
                            <SimpleInput
                                label="Email"
                                helperText={errors.email?.message}
                                error={!!errors.email}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'Cannot be empty' }}
                        render={({ field }) => (
                            <InputHidden
                                label="Password"
                                helperText={errors.password?.message}
                                error={!!errors.password}
                                {...field}
                            />
                        )}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit(onSubmit)} loading={isLoading}>
                    Sign In
                </Button>
            </DialogActions>
        </Fragment>
    );
}
