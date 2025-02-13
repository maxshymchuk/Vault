import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { store } from './redux';
import { Provider } from 'react-redux';
import { AppNotifications } from './containers';
import App from './App';

const root = createRoot(document.getElementById('root')!);

root.render(
    <Provider store={store}>
        <CssBaseline />
        <AppNotifications />
        <App />
    </Provider>
);