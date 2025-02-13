import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { stopPropagation } from '../../../utils';
import { useCopy } from '../../../hooks';
import type { MenuButton } from '../types';

type Props = {
    record: VaultRecord;
    buttons?: Array<MenuButton>
}

const Controls = ({ record, buttons }: Props) => {
    const copy = useCopy(record.hidden);

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(e.currentTarget);
    };

    const closeMenu = () => {
        setAnchor(null);
    };

    return (
        <div onClick={stopPropagation}>
            {record.hidden && (
                <IconButton onClick={copy}>
                    <ContentCopyIcon />
                </IconButton>
            )}
            <IconButton onClick={openMenu}>
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchor} open={Boolean(anchor)} onClick={closeMenu} onClose={closeMenu}>
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