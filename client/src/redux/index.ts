export { default as store, useAppDispatch } from './store';
export type { RootState, AppDispatch } from './store';

export { notify, close } from './slices/notifications.slice';
export type { Notification } from './slices/notifications.slice';

export { setAuthenticated } from './slices/auth.slice';
export type { AuthState } from './slices/auth.slice';

export { setSearch, selectRecords, updateRecords, reset } from './slices/records.slice';
export type { RecordsState } from './slices/records.slice';
