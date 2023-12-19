import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { Events } from '../../constants/config';
import { Notification } from '../../types';

const AppSnackbar = () => {
    const [isOpen, setOpen] = useState(false);
    const [notification, setNotification] = useState<Notification>();

    const handleClose = () => {
        setOpen(false);
    };

    const handleNotification = (e: CustomEvent<Notification>) => {
        setNotification(e.detail);
        setOpen(true);
    };

    useEffect(() => {
        document.addEventListener(Events.Notification, handleNotification);
        return () => {
            document.removeEventListener(Events.Notification, handleNotification);
        };
    }, []);

    if (!notification) return null;

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={1000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleClose}
        >
            <Alert severity={notification.type} variant='filled'>
                {notification.message}
            </Alert>
        </Snackbar>
    );
};

export default AppSnackbar;