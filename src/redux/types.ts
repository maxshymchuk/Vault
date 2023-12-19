import { VaultRecord } from '../types';
import { Status } from '../constants/config';

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