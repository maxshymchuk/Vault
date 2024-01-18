import React, { memo } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import type { Props } from './types';

const SimpleDialog = memo(({ isOpen, title, children, actions }: Props) => {
    return (
        <Dialog open={isOpen}>
            <DialogTitle>
                {title}
            </DialogTitle>
            {children && (
                <DialogContent>
                    {children}
                </DialogContent>
            )}
            {actions && (
                <DialogActions>
                    {actions}
                </DialogActions>
            )}
        </Dialog>
    );
});

export default SimpleDialog;