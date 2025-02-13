import React, { useState } from 'react';
import { AppBar as MUIAppBar, Box, IconButton, Toolbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Offset } from './styled';
import { Search } from '../../components';
import { AppMenu } from '../AppMenu';
import { useSelector } from 'react-redux';
import { setSearch, useAppDispatch } from '../../redux';
import { RecordUpdate } from '../RecordUpdate';
import { useModal } from '../../hooks';
import type { RootState } from '../../redux';
import { useAddMutation } from '../../services/record.service';

export default function AppBar() {
    const dispatch = useAppDispatch();

    const [addRecord, { isLoading }] = useAddMutation()

    const { search } = useSelector((state: RootState) => state.records);

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    const updateRecordModal = useModal();

    const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(e.currentTarget);
    };

    const closeMenu = () => {
        setAnchor(null);
    };

    const updateSearch = (value: string) => {
        dispatch(setSearch(value));
    };

    const handleRecordAdd = (record: VaultRecordPending) => {
        addRecord(record).unwrap().then(() => updateRecordModal.hide());
    };

    return (
        <React.Fragment>
            <RecordUpdate
                open={updateRecordModal.isOpen}
                isLoading={isLoading}
                onUpdate={handleRecordAdd}
                onClose={updateRecordModal.hide}
            />
            <MUIAppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <AppMenu anchor={anchor} onClose={closeMenu} />
                    <Search value={search} onChange={updateSearch} />
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color='inherit' onClick={updateRecordModal.show}>
                        <AddIcon />
                    </IconButton>
                    <IconButton color='inherit' onClick={openMenu}>
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            </MUIAppBar>
            <Offset/>
        </React.Fragment>
    );
}