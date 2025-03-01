import type { ReactNode } from 'react';
import type { DialogProps, DialogTitleProps, DialogContentProps, DialogActionsProps } from '@mui/material';

type Props = DialogProps & {
    title?: string;
    children?: ReactNode;
    actions?: ReactNode;
    titleProps?: DialogTitleProps;
    contentProps?: DialogContentProps;
    actionsProps?: DialogActionsProps;
};

export type { Props };
