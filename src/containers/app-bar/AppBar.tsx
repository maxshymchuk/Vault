import React, { useState } from 'react';
import { AppBar as MUIAppBar, Box, IconButton, Toolbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Offset } from './styled';
import { Search } from '../../components/search';
import { AppMenu } from '../app-menu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setSearch } from '../../redux';
import { RecordUpdate } from '../record-update';
import { useModal } from '../../utils/hooks';

export default function AppBar() {
    const dispatch = useDispatch();

    const { search } = useSelector((state: RootState) => state.data);

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    const updateRecord = useModal();

    const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(e.currentTarget);
    };

    const closeMenu = () => {
        setAnchor(null);
    };

    const updateSearch = (value: string) => {
        dispatch(setSearch(value));
    };

    const handleRecordAdd = () => {
        updateRecord.show();
    };

    return (
        <React.Fragment>
            <RecordUpdate
                isOpen={updateRecord.isOpen}
                onSubmit={() => console.log('SUBMIT')}
                onClose={updateRecord.hide}
            />
            <MUIAppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <AppMenu anchor={anchor} onClose={closeMenu} />
                    <Search value={search} onChange={updateSearch} />
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color='inherit' onClick={handleRecordAdd}>
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