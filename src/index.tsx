import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { store } from './redux';
import { Provider } from 'react-redux';
import App from './App';

const root = createRoot(document.getElementById('root')!);

root.render(
    <Provider store={store}>
        <CssBaseline />
        <App />
    </Provider>
);