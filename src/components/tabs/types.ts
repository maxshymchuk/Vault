import React, { SyntheticEvent } from 'react';

type TabsProps = {
    labels: Array<string>;
    value: number;
    onChange?: (e: SyntheticEvent, value: number) => void;
    children?: React.ReactNode;
}


type TabProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export type { TabProps, TabsProps };