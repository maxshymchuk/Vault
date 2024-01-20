import React, { memo } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { SimpleDialog } from '../../components/simple-dialog';
import Controls from './components/Controls';
import ListItemWithDivider from './components/ListItemWithDivider';
import type { Props } from './types';

const RecordPreview = memo(({ open, record, onClose }: Props) => {
    if (!record) return null;

    return (
        <SimpleDialog
            open={open}
            title={record.title}
            actions={<Controls record={record} onClose={onClose} />}
            fullWidth
        >
            <List disablePadding>
                {record.title && (
                    <ListItem disableGutters>
                        <ListItemText primary='Title' secondary={record.title} />
                    </ListItem>
                )}
                {record.description && (
                    <ListItemWithDivider>
                        <ListItemText primary='Description' secondary={record.description} />
                    </ListItemWithDivider>
                )}
            </List>
        </SimpleDialog>
    );
});

export default RecordPreview;