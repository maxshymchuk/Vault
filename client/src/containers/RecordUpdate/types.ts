import type { MouseEvent } from 'react';

type Props = {
    open: boolean;
    record?: VaultRecord;
    isLoading?: boolean;
    onUpdate: (record: VaultRecord | VaultRecordPending) => void;
    onClose: (e: MouseEvent) => void;
};

export type { Props };
