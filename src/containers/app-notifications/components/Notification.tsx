import { Alert, AlertTitle, Grow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import type { Notification as NotificationType } from '../../../redux';

type Props = {
    notification: NotificationType;
    timeout?: number;
    onClose: (id: number) => void;
}

export default function Notification({ notification, timeout = 200, onClose }: Props) {
    const [isOpen, setOpen] = useState(true);

    const closeNotification = () => onClose(notification.id);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, notification.lifespan);
        return () => clearTimeout(timer);
    }, [notification.lifespan]);

    return (
        <Grow in={isOpen} timeout={timeout} onExited={closeNotification}>
            <Alert severity={notification.type} variant='filled' onClose={closeNotification}>
                {notification.title && <AlertTitle>{notification.title}</AlertTitle>}
                {notification.message}
            </Alert>
        </Grow>
    );
}