import React, { memo } from 'react';
import { styled } from '@mui/material';

const Wrapper = styled('div')(() => ({
    position: 'absolute',
    left: '0',
    top: '0',
    right: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    userSelect: 'none',
    zIndex: '1',
    textAlign: 'center',
    wordWrap: 'break-word',
    fontSize: '2em',
    textTransform: 'uppercase',
    overflow: 'hidden'
}));

const TEMP_InProgress = memo(() => (
    <Wrapper>
        Work in progress
    </Wrapper>
));

export default TEMP_InProgress;