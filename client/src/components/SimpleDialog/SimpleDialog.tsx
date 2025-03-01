import React, { memo } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import type { Props } from './types';

const SimpleDialog = memo(({ title, children, actions, titleProps, contentProps, actionsProps, ...props }: Props) => (
    <Dialog {...props}>
        {title && <DialogTitle {...titleProps}>{title}</DialogTitle>}
        {children && <DialogContent {...contentProps}>{children}</DialogContent>}
        {actions && <DialogActions {...actionsProps}>{actions}</DialogActions>}
    </Dialog>
));

export default SimpleDialog;
