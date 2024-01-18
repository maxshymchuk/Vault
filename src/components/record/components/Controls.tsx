import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDispatch } from 'react-redux';
import { notify } from '../../../redux';
import { stopPropagation } from '../../../utils/helpers';
import { MenuList } from '../../menu-list';
import { VaultRecord } from '../../../types';

type Props = {
    record: VaultRecord;
}

const Controls = ({ record }: Props) => {
    const dispatch = useDispatch();

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    const copyToClipboard = () => {
        if (!record.hidden) return;
        navigator.clipboard.writeText(record.hidden).then(
            () => dispatch(notify({ type: 'info', message: 'Copied!' })),
            () => dispatch(notify({ type: 'error', title: 'Error', message: 'Can\'t copy :(' }))
        );
    };

    const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(e.currentTarget);
    };

    const closeMenu = () => {
        setAnchor(null);
    };

    return (
        <div onClick={stopPropagation}>
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
        </div>
    );
};

export default Controls;