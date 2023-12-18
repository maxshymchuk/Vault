import React from 'react';
import { Box } from '@mui/material';
import { TabProps } from './types';

export default function Tab(props: TabProps) {
    const { children, value, index, ...rest } = props;

    return (
        <div role='tabpanel' hidden={value !== index} {...rest}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}