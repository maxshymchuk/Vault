import React, { memo } from 'react';
import type { ReactNode } from 'react';

type TabPanelProps = {
    children?: ReactNode;
    index: number;
    value: number;
    [key: string]: unknown;
}

const TabPanel = memo(({ children, value, index, ...rest }: TabPanelProps) => (
    <div role='tabpanel' hidden={value !== index} {...rest}>
        {children}
    </div>
));

export default TabPanel;