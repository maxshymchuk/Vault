import React from 'react';
import { Box, Tab as MUITab, Tabs as MUITabs } from '@mui/material';
import { TabsProps } from './types';

export default function Tabs(props: TabsProps) {
    const { labels, value, onChange, children } = props;

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <MUITabs variant='fullWidth' value={value} onChange={onChange}>
                    {labels.map((label, index) => (
                        <MUITab key={index} label={label} />
                    ))}
                </MUITabs>
            </Box>
            {children}
        </>
    );
}