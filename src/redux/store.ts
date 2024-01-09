import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import dataReducer from './slices/data.slice';
import notificationsReducer from './slices/notifications.slice';
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer,
        notifications: notificationsReducer
    },
});

export default store;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;