import React from 'react';
import type { VaultRecord } from '../../types';

type Props = {
    isOpen: boolean;
    record?: VaultRecord;
    onSubmit: (record: VaultRecord) => void;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type { Props };