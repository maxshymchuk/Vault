import React from 'react';
import { Divider, Menu, MenuItem } from '@mui/material';
import { Props } from './types';
import { reset, setAuthenticated, useAppDispatch } from '../../redux';
import { useRecords } from '../../hooks';

export default function AppMenu({ anchor, onClose }: Props) {
    const dispatch = useAppDispatch();

    const { selectedRecords } = useRecords();

    const handleSignOut = () => {
        dispatch(reset());
        dispatch(setAuthenticated());
    }

    return (
       <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={onClose}>
           {selectedRecords.length > 0 && (
               <MenuItem onClick={() => console.log(selectedRecords)}>Delete Selected</MenuItem>
           )}
           {selectedRecords.length > 0 && <Divider />}
           <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
       </Menu>
    );
}