import React, { memo } from 'react';
import { SimpleDialog } from '../simple-dialog';
import Controls from './components/Controls';
import type { Props } from './types';

const SimpleQuestion = memo(({ isOpen, title, children, onResolve, onReject }: Props) => (
    <SimpleDialog
        isOpen={isOpen}
        title={title}
        actions={<Controls onResolve={onResolve} onReject={onReject} />}
    >
        {children}
    </SimpleDialog>
));

export default SimpleQuestion;