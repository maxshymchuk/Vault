import React from 'react';
import { Divider, Menu, MenuItem } from '@mui/material';
import { Props } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

export default function AppMenu({ anchor, onClose }: Props) {
    const { selectedRecords } = useSelector((state: RootState) => state.data);

    return (
       <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={onClose}>
           {selectedRecords.length > 0 && (
               <MenuItem onClick={() => console.log('Delete Selected')}>Delete Selected</MenuItem>
           )}
           {selectedRecords.length > 0 && <Divider />}
           <MenuItem onClick={() => console.log('Settings')}>Settings</MenuItem>
       </Menu>
    );
}