import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        auth: authReducer
    },
});

export default store;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;