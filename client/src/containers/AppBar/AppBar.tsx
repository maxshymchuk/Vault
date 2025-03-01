import React, { useState } from 'react';
import { AppBar as MUIAppBar, Box, IconButton, Toolbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Offset } from './styled';
import { Search } from '../../components';
import { AppMenu } from '../AppMenu';
import { RecordUpdate } from '../RecordUpdate';
import { useModal, useRecords } from '../../hooks';
import { useAddMutation } from '../../services/record.service';

export default function AppBar() {
    const [addRecord, { isLoading }] = useAddMutation();

    const { search, updateSearch } = useRecords();

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    const updateRecordModal = useModal();

    const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(e.currentTarget);
    };

    const closeMenu = () => {
        setAnchor(null);
    };

    const handleRecordAdd = (record: VaultRecordPending) => {
        addRecord(record)
            .unwrap()
            .then(() => updateRecordModal.hide());
    };

    return (
        <React.Fragment>
            <RecordUpdate
                open={updateRecordModal.isOpen}
                isLoading={isLoading}
                onUpdate={handleRecordAdd}
                onClose={updateRecordModal.hide}
            />
            <MUIAppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <AppMenu anchor={anchor} onClose={closeMenu} />
                    <Search value={search} onChange={updateSearch} />
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="inherit" onClick={updateRecordModal.show}>
                        <AddIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={openMenu}>
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            </MUIAppBar>
            <Offset />
        </React.Fragment>
    );
}
