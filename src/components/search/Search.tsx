import { StyledRoot, StyledIconWrapper, StyledInputBase } from './styled';
import SearchIcon from '@mui/icons-material/Search';
import React, { memo } from 'react';
import type { Props } from './types';

const Search = memo(({ value, onChange }: Props) => (
    <StyledRoot>
        <StyledIconWrapper>
            <SearchIcon />
        </StyledIconWrapper>
        <StyledInputBase value={value} onChange={onChange} placeholder='Search…' />
    </StyledRoot>
));

export default Search;