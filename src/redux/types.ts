import { VaultRecord } from '../types';
import type { Status } from '../constants/config';
import type { AlertColor } from '@mui/material/Alert';

export type User = {
    nickname: string;
}

export type Auth = {
    user: User | null;
    token: string | null;
    isLogged: boolean;
    status: Status;
}

export type Data = {
    records: Array<VaultRecord>;
    filteredRecords: Array<VaultRecord>;
    selectedRecords: Array<VaultRecord>;
    search: string;
    status: Status;
}

export type Notification = {
    id: string;
    type: AlertColor;
    title?: string;
    message?: string;
    lifespan?: number;
}