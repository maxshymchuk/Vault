import { Dialog } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { Tabs, Tab } from '../../components/tabs';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

export default function AuthDialog() {
    const [selectedTab, setSelectedTab] = useState(0);

    const onTabChange = (e: SyntheticEvent, value: number) => {
        setSelectedTab(value);
    };

    return (
        <Dialog open={true}>
            <Tabs labels={['Sign In', 'Sign Up']} value={selectedTab} onChange={onTabChange}>
                <Tab value={selectedTab} index={0}>
                    <SignInForm />
                </Tab>
                <Tab value={selectedTab} index={1}>
                    <SignUpForm />
                </Tab>
            </Tabs>
        </Dialog>
    );
}