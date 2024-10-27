import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../redux';
import { StyledStack } from './styled';
import Notification from './components/Notification';
import type { RootState } from '../../redux';

const AppNotifications = () => {
    const dispatch = useDispatch();

    const { stack } = useSelector((state: RootState) => state.notifications);

    const closeNotificationById = (id: number) => dispatch(close(id));

    return (
        <StyledStack spacing={1}>
            {stack.map(notification => (
                <Notification
                    key={notification.id}
                    notification={notification}
                    onClose={closeNotificationById}
                />
            ))}
        </StyledStack>
    );
};

export default AppNotifications;