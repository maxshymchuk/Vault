import React, { memo } from 'react';
import { Divider, ListItem } from '@mui/material';
import { ListItemBaseProps } from '@mui/material';

const ListItemWithDivider = memo((props: ListItemBaseProps) => (
    <React.Fragment>
        <Divider component='li' sx={{ opacity: 0.6 }} />
        <ListItem disableGutters {...props} />
    </React.Fragment>
));

export default ListItemWithDivider;