import type { ReactNode } from 'react';

type Props = {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    actions?: ReactNode;
}

export type { Props };