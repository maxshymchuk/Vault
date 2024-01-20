import React, { forwardRef, useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SimpleInput } from '../../../components';

type Props = {
    withViewToggle?: boolean;
    [key: string]: unknown;
}

const HiddenInput = forwardRef<HTMLDivElement, Props>(({ withViewToggle = true, ...props }, ref) => {
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

export default HiddenInput;