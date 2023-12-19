import React, { memo } from 'react';
import { Box, Tab as MUITab, Tabs as MUITabs } from '@mui/material';
import { TabsProps } from './types';

const Tabs = memo((props: TabsProps) => {
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
});

export default Tabs;