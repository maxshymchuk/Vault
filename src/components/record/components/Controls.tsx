import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { dispatchNotification } from '../../../utils/helpers';
import { MenuList } from '../../menu-list';
import { VaultRecord } from '../../../types';

type Props = {
    record: VaultRecord;
}

const Controls = ({ record }: Props) => {
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    const copyToClipboard = () => {
        if (!record.hidden) return;
        navigator.clipboard.writeText(record.hidden).then(
            () => dispatchNotification('info', 'Copied!'),
            () => dispatchNotification('error', 'Can\'t copy :(')
        );
    };

    const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(e.currentTarget);
    };

    const closeMenu = () => {
        setAnchor(null);
    };

    return (
        <React.Fragment>
            {record.hidden && (
                <IconButton onClick={copyToClipboard}>
                    <ContentCopyIcon />
                </IconButton>
            )}
            <IconButton onClick={openMenu}>
                <MoreVertIcon />
            </IconButton>
            <MenuList
                buttons={[
                    { title: 'Edit', action: () => console.log('EDIT') },
                    { title: 'Delete', action: () => console.log('DELETE') }
                ]}
                anchor={anchor}
                onClose={closeMenu}
            />
        </React.Fragment>
    );
};

export default Controls;