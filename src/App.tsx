import React, { useEffect } from 'react';
import { AppBar } from './containers/app-bar';
import { AuthDialog } from './containers/auth-dialog';
import { AppList } from './containers/app-list';
import { AppNotifications } from './containers/app-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAuthenticated } from './redux';
import { useCheckAuthQuery } from './services/auth.service';

export default function App() {
    const dispatch = useDispatch();
    
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const { data, isError } = useCheckAuthQuery(); 

    useEffect(() => {
        if (data) {
            dispatch(setAuthenticated(true));
        } else if (isError) {
            dispatch(setAuthenticated(false));
        }
    }, [data, isError, dispatch]);

    return (
        <React.Fragment>
            <AppNotifications />
            {isAuthenticated ? (
                <>
                    Logged 
                    {/* <AppList /> */}
                    {/* <AppBar /> */}
                </>
            ) : (
                <AuthDialog />
            )}
        </React.Fragment>
    );
}