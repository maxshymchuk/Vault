import { TextField } from '@mui/material';
import React, { forwardRef, memo } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';

const SimpleInput = memo(forwardRef<HTMLDivElement | null, TextFieldProps>((props, ref) => (
    <TextField ref={ref} variant='outlined' size='small' margin='dense' {...props} />
)));

export default SimpleInput;