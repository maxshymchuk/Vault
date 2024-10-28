import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AlertColor } from '@mui/material/Alert';

type Notification = {
    id: number;
    type: AlertColor;
    title?: string;
    message?: string;
    lifespan?: number;
}

type Notifications = {
    index: number;
    stack: Array<Notification>;
}

const initialState: Notifications = {
    index: 0,
    stack: []
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        notify: (state, { payload }: PayloadAction<Omit<Notification, 'id'>>) => {
            const uniqueNotification: Notification = {
                id: state.index,
                type: payload.type,
                title: payload.title,
                message: payload.message,
                lifespan: payload.lifespan ?? 1000
            };
            state.index++;
            state.stack = [...state.stack, uniqueNotification];
        },
        close: (state, { payload }: PayloadAction<number>) => {
            state.stack = state.stack.filter(n => n.id !== payload);
        }
    }
});

export default notificationsSlice;
export const { notify, close } = notificationsSlice.actions;
export type { Notification };