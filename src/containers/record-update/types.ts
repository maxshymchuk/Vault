import React from 'react';
import type { VaultRecord, VaultRecordPublic } from '../../types';

type Props = {
    isOpen: boolean;
    record?: VaultRecord;
    onUpdate: (record: VaultRecordPublic) => void;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type { Props };