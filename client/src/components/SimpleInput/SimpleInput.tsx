import { TextField } from '@mui/material';
import React, { memo } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';

const SimpleInput = memo<TextFieldProps>(({ ref, ...props }) => (
    <TextField ref={ref} variant="outlined" size="small" margin="dense" {...props} />
));

export default SimpleInput;
