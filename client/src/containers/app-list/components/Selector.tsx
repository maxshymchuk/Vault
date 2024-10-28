import React, { memo } from 'react';
import { Box, Button, Paper, styled } from '@mui/material';

type Props = {
    selected: number;
    full: number;
    onClick: () => void;
};

const StyledBox = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
}));

const Selector = memo(({ selected, full, onClick }: Props) => (
    <StyledBox square sx={{ p: 2 }}>
        {`Selected ${selected}/${full}`}
        <Box sx={{ flexGrow: 1 }} />
        <Button
            variant='text'
            size='small'
            sx={{ color: theme => theme.palette.common.white }}
            onClick={onClick}
        >
            {selected === full ? 'Deselect All' : 'Select All'}
        </Button>
    </StyledBox>
));

export default Selector;