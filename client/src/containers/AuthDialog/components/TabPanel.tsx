import React, { memo } from 'react';

type TabPanelProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    index: number;
    value: number;
};

const TabPanel = memo(({ children, value, index, ...rest }: TabPanelProps) => (
    <div role="tabpanel" hidden={value !== index} {...rest}>
        {children}
    </div>
));

export default TabPanel;
