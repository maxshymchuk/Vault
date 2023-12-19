import React from 'react';
import { AppBar } from './containers/app-bar';
import { useSelector } from 'react-redux';
import { RootState } from './redux';
import { AuthDialog } from './containers/auth-dialog';
import { AppList } from './containers/app-list';
import { AppSnackbar } from './containers/app-snackbar';

export default function App() {
    const { isLogged } = useSelector((state: RootState) => state.auth);

    if (!isLogged) return <AuthDialog />;

    return (
        <React.Fragment>
            <AppSnackbar />
            <AppList />
            <AppBar />
        </React.Fragment>
    );
}