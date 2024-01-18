import React from 'react';
import type { VaultRecord, VaultRecordPublic } from '../../types';

type Props = {
    isOpen: boolean;
    record?: VaultRecord;
    onSubmit: (record: VaultRecordPublic) => void;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type { Props };