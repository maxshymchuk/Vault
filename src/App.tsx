import React from 'react';
import { AppBar } from './containers/app-bar';
import { useSelector } from 'react-redux';
import { RootState } from './redux';
import { AuthDialog } from './containers/auth-dialog';
import { AppList } from './containers/app-list';
import { AppNotifications } from './containers/app-notifications';

export default function App() {
    const { isLogged } = useSelector((state: RootState) => state.auth);

    if (!isLogged) return <AuthDialog />;

    return (
        <React.Fragment>
            <AppNotifications />
            <AppList />
            <AppBar />
        </React.Fragment>
    );
}