import { TextField } from '@mui/material';
import React, { memo } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';

const SimpleInput = memo((props: TextFieldProps) => (
    <TextField variant='outlined' size='small' {...props} />
));

export default SimpleInput;