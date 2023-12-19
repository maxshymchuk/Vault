import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import Controls from './components/Controls';
import { Props } from './types';
import { stopPropagation } from '../../utils/helpers';

const Record = ({ record, isSelected, onSelect, onClick }: Props) => {
    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        stopPropagation(e);
        onSelect?.(record);
    };

    const handleClick = () => {
        onClick?.(record);
    };

    return (
        <ListItem
            key={record.id}
            onClick={handleClick}
            secondaryAction={<Controls record={record} />}
            disablePadding
        >
            <ListItemButton>
                <ListItemIcon>
                    <Checkbox
                        edge='start'
                        checked={isSelected}
                        onChange={handleSelect}
                        onClick={stopPropagation}
                        tabIndex={-1}
                    />
                </ListItemIcon>
                <ListItemText primary={record.title} secondary={record.description} />
            </ListItemButton>
        </ListItem>
    );
};

export default Record;