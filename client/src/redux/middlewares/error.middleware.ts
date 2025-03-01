import { isRejectedWithValue } from '@reduxjs/toolkit';
import { notify } from '../slices/notifications.slice';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

const errorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        api.dispatch(
            notify({
                type: 'error',
                message: (action.payload as { data?: string })?.data ?? 'Something went wrong',
                lifespan: 2000,
            }),
        );
    }

    return next(action);
};

export { errorMiddleware };
