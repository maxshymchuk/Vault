import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDispatch } from 'react-redux';
import { notify } from '../../../redux';
import { stopPropagation } from '../../../utils/helpers';
import type { VaultRecord } from '../../../types';
import type { MenuButton } from '../types';

type Props = {
    record: VaultRecord;
    buttons?: Array<MenuButton>
}

const Controls = ({ record, buttons }: Props) => {
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
            <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={closeMenu}>
                {buttons?.map(button => (
                    <MenuItem key={button.title} onClick={() => button.action(record)}>
                        {button.title}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default Controls;