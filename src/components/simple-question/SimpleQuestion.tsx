import React, { memo } from 'react';
import { SimpleDialog } from '../simple-dialog';
import Controls from './components/Controls';
import type { Props } from './types';

const SimpleQuestion = memo(({ open, title, children, onResolve, onReject }: Props) => (
    <SimpleDialog
        open={open}
        title={title}
        actions={<Controls onResolve={onResolve} onReject={onReject} />}
    >
        {children}
    </SimpleDialog>
));

export default SimpleQuestion;