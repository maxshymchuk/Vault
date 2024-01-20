import React from 'react';
import type { VaultRecord } from '../../types';

type Props = {
    open: boolean;
    record?: VaultRecord;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type { Props };