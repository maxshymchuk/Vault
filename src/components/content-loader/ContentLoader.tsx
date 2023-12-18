import React, { memo } from 'react';
import type { Props } from './types';
import { CircularProgress } from '@mui/material';

const ContentLoader = memo(({ isLoading, children }: Props) => isLoading ? <CircularProgress /> : children);

export default ContentLoader;