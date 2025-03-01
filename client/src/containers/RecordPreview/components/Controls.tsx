import React from 'react';
import { Button } from '@mui/material';
import { useCopy } from '../../../hooks';
import type { MouseEvent } from 'react';

type Props = {
    record: VaultRecord;
    onClose: (e: MouseEvent) => void;
};

export default function Controls({ record, onClose }: Props) {
    const copy = useCopy(record.hidden);

    return (
        <React.Fragment>
            {record?.hidden && <Button onClick={copy}>Copy</Button>}
            <Button onClick={onClose}>Close</Button>
        </React.Fragment>
    );
}
