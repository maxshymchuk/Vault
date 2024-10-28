import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth.slice';
import recordsSlice from './slices/records.slice';
import notificationsSlice from './slices/notifications.slice';
import { authApi } from '../services/auth.service';
import { recordApi } from '../services/record.service';
import { recordsApi } from '../services/records.service';
import { useDispatch } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { errorMiddleware } from './middlewares/error.middleware';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        records: recordsSlice.reducer,
        notifications: notificationsSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [recordApi.reducerPath]: recordApi.reducer,
        [recordsApi.reducerPath]: recordsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
        errorMiddleware,
        authApi.middleware, 
        recordApi.middleware,
        recordsApi.middleware
    ),
});

setupListeners(store.dispatch)

export default store;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;