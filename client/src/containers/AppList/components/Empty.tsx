import React, { memo } from 'react';
import { alpha, Box, styled, Typography } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    pointerEvents: 'none',
    color: alpha(theme.palette.common.black, 0.25),
}));

const Empty = memo(() => (
    <StyledBox>
        <SentimentDissatisfiedIcon sx={{ fontSize: '120px', mb: 1 }} />
        <Typography variant="h4">Nothing found...</Typography>
    </StyledBox>
));

export default Empty;
