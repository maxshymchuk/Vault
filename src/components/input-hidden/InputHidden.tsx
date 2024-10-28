import React, { forwardRef, useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SimpleInput } from '../simple-input';
import type { Props } from './types';

const InputHidden = forwardRef<HTMLDivElement, Props>(({ withViewToggle = true, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    const toggle = () => setVisible(isVisible => !isVisible);

    return (
        <SimpleInput
            ref={ref}
            type={visible ? 'text' : 'password'}
            autoComplete='current-password'
            InputProps={withViewToggle ? {
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={toggle} edge='end'>
                            {visible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            } : {}}
            {...props}
        />
    );
});

export default InputHidden;