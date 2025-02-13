import React, { memo } from 'react';
import { StyledRoot, StyledIconWrapper, StyledInputBase } from './styled';
import SearchIcon from '@mui/icons-material/Search';
import type { Props } from './types';
import ClearButton from './components/ClearButton';

const Search = memo(({ value, onChange }: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.currentTarget.value);
    };

    const handleClear = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onChange?.('');
    };

    return (
        <StyledRoot>
            <StyledInputBase
                value={value}
                onChange={handleChange}
                placeholder='Search…'
                startAdornment={<StyledIconWrapper><SearchIcon /></StyledIconWrapper>}
                endAdornment={<ClearButton isVisible={Boolean(value)} onClick={handleClear} />}
            />
        </StyledRoot>
    );
});

export default Search;