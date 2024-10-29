import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { InputHidden, SimpleDialog, SimpleInput } from '../../components';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import type { Props } from './types';

export default function RecordUpdate({ open, record: externalRecord, isLoading = false, onUpdate, onClose }: Props) {
    const isUpdate = !!externalRecord;

    const { control, handleSubmit, reset, formState: { errors } } = useForm<VaultRecordPending>({
        defaultValues: {
            title: '',
            description: '',
            hidden: '',
        },
        values: isUpdate ? {
            title: externalRecord.title,
            description: externalRecord.description ?? '',
            hidden: externalRecord.hidden ?? '',
        } : undefined
    });

    useEffect(() => {
        if (open) reset();
    }, [open, reset]);

    const onSubmit: SubmitHandler<VaultRecordPending> = (data) => onUpdate(isUpdate ? ({ ...externalRecord, ...data }) : data);

    return (
        <SimpleDialog
            open={open}
            title={isUpdate ? 'Update record' : 'New record'}
            actions={(
                <React.Fragment>
                    <LoadingButton onClick={handleSubmit(onSubmit)} loading={isLoading}>
                        {isUpdate ? 'Update' : 'Add'}
                    </LoadingButton>
                    <Button onClick={onClose}>
                        Close
                    </Button>
                </React.Fragment>
            )}
        >
            <Stack spacing={0} useFlexGap>
                <Controller
                    name='title'
                    control={control}
                    rules={{ required: 'Cannot be empty' }}
                    render={({ field }) => (
                        <SimpleInput
                            label='Title'
                            helperText={errors.title?.message}
                            error={!!errors.title}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <SimpleInput label='Description' {...field} />
                    )}
                />
                <Controller
                    name='hidden'
                    control={control}
                    render={({ field }) => (
                        <InputHidden label='Hidden' {...field} />
                    )}
                />
            </Stack>
        </SimpleDialog>
    );
}