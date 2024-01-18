import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Notification } from '../types';

type Notifications = {
    stack: Array<Notification>;
}

const initialState: Notifications = {
    stack: []
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        notify: (state, { payload }: PayloadAction<Omit<Notification, 'id'>>) => {
            const uniqueNotification: Notification = {
                id: crypto.randomUUID(),
                type: payload.type,
                title: payload.title,
                message: payload.message,
                lifespan: payload.lifespan ?? 1000
            };
            state.stack = [...state.stack, uniqueNotification];
        },
        close: (state, { payload }: PayloadAction<string>) => {
            state.stack = state.stack.filter(n => n.id !== payload);
        }
    }
});

export const { notify, close } = notificationsSlice.actions;

export default notificationsSlice.reducer;