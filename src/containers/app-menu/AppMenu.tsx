import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { Props } from './types';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux';

export default function AppMenu({ anchor, onClose }: Props) {
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
    };

    return (
       <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={onClose}>
           <MenuItem onClick={onLogout}>Logout</MenuItem>
       </Menu>
    );
}