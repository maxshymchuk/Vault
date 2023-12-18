import { VaultRecord } from '../types';

export const AllRecordsMock: Array<VaultRecord> = [
    {
        title: 'First Record',
        description: 'Description',
        createdAt: 1702672064341,
        changedAt: 1702672064341,
    },
    {
        title: 'Second Record',
        createdAt: 1702672064541,
        changedAt: 1702672064541,
    },
    {
        title: 'Third Record',
        hidden: 'password',
        createdAt: 1702672065541,
        changedAt: 1702672065541,
    }
];