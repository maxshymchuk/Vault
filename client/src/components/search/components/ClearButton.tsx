import React, { memo } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { StyledIconWrapper } from '../styled';
import { styled } from '@mui/material';

type Props = {
    isVisible: boolean;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const StyledClearIconWrapper = styled(StyledIconWrapper)({
    pointerEvents: 'auto',
    cursor: 'pointer'
});

const ClearButton = memo(({ isVisible, onClick }: Props) => (
    <StyledClearIconWrapper sx={{ visibility: isVisible ? 'visible' : 'hidden' }} onClick={onClick}>
        <ClearIcon />
    </StyledClearIconWrapper>
));

export default ClearButton;