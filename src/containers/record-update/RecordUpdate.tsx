import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { SimpleDialog, SimpleInput } from '../../components';
import { Controller, useForm } from 'react-hook-form';
import type { Props } from './types';
import HiddenInput from './components/HiddenInput';
import { VaultRecordPublic } from '../../types';
import Controls from './components/Controls';

export default function RecordUpdate({ isOpen, record: externalRecord, onUpdate, onClose }: Props) {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<VaultRecordPublic>({
        defaultValues: {
            title: '',
            description: '',
            hidden: '',
        },
        values: externalRecord ? {
            title: externalRecord.title,
            description: externalRecord.description ?? '',
            hidden: externalRecord.hidden ?? '',
        } : undefined
    });

    useEffect(() => {
        if (isOpen) reset();
    }, [isOpen, reset]);

    const onSubmit = handleSubmit(data => onUpdate(data));

    return (
        <SimpleDialog
            isOpen={isOpen}
            title={externalRecord ? 'Update record' : 'New record'}
            actions={<Controls onClose={onClose} />}
        >
            <form id='update-record-form' onSubmit={onSubmit}>
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
                            <HiddenInput label='Hidden' {...field} />
                        )}
                    />
                </Stack>
            </form>
        </SimpleDialog>
    );
}