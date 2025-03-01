import type { MouseEvent } from 'react';

type Props = {
    open: boolean;
    record?: VaultRecord;
    onClose: (e: MouseEvent) => void;
};

export type { Props };
