import type { ChangeEvent } from 'react';

type Props = {
    value?: string;
    onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
}

export type { Props };