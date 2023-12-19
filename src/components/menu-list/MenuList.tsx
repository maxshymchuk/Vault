import React, { memo } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { Props } from './types';

const MenuList = memo(({ buttons, anchor, onClose }: Props) => (
    <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={onClose}>
        {buttons.map(button => (
            <MenuItem key={button.title} onClick={button.action}>
                {button.title}
            </MenuItem>
        ))}
    </Menu>
));

export default MenuList;