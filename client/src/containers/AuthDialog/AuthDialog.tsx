import { Box, Dialog, Tab, Tabs } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import TabPanel from './components/TabPanel';

export default function AuthDialog() {
    const [selectedTab, setSelectedTab] = useState(0);

    const onTabChange = (e: SyntheticEvent, value: number) => {
        setSelectedTab(value);
    };

    return (
        <Dialog open={true}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={selectedTab} onChange={onTabChange} variant="fullWidth">
                    <Tab label="Sign In" />
                    <Tab label="Sign Up" />
                </Tabs>
            </Box>
            <TabPanel index={0} value={selectedTab}>
                <SignInForm />
            </TabPanel>
            <TabPanel index={1} value={selectedTab}>
                <SignUpForm />
            </TabPanel>
        </Dialog>
    );
}
