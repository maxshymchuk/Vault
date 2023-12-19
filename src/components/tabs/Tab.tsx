import React, { memo } from 'react';
import { Box } from '@mui/material';
import { TabProps } from './types';

const Tab = memo((props: TabProps) => {
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
});

export default Tab;