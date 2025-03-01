import React, { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SimpleInput } from '../SimpleInput';
import type { Props } from './types';

const InputHidden = ({ withViewToggle = true, ...props }: Props) => {
    const [visible, setVisible] = useState(false);

    const toggle = () => setVisible(isVisible => !isVisible);

    return (
        <SimpleInput
            type={visible ? 'text' : 'password'}
            autoComplete='new-password'
            slotProps={{
                input: withViewToggle ? {
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={toggle} edge='end'>
                                {visible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : {}
            }}
            {...props}
        />
    );
};

export default InputHidden;