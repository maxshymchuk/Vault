import { VaultRecord } from '../../types';

type Props = {
    record: VaultRecord;
    isSelected?: boolean;
    onClick?: (record: VaultRecord) => void;
    onSelect?: (record: VaultRecord) => void;
}

export type { Props };