import React, { useEffect } from 'react';
import { AppBar } from './containers/app-bar';
import { AuthDialog } from './containers/auth-dialog';
import { AppList } from './containers/app-list';
import { useSelector } from 'react-redux';
import { RootState, setAuthenticated, useAppDispatch } from './redux';
import { getLocalStorage } from './utils';

export default function App() {
    const dispatch = useAppDispatch();

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    // temporal solution
    useEffect(() => {
        const vault = getLocalStorage();
        dispatch(setAuthenticated(vault?.token));
    }, []);

    // for prod to check cookie
    // const { data, isError } = useCheckAuthQuery();
    // useEffect(() => {
    //     if (data) {
    //         dispatch(setAuthenticated(true));
    //     } else if (isError) {
    //         dispatch(setAuthenticated(false));
    //     }
    // }, [data, isError, dispatch]);

    if (!isAuthenticated) return <AuthDialog />;

    return (
        <React.Fragment>
            <AppList />
            <AppBar />
        </React.Fragment>
    );
}