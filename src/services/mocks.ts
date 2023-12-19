import { VaultRecord } from '../types';

export const AllRecordsMock: Array<VaultRecord> = [
    {
        id: '1',
        title: 'First Record',
        description: 'Description',
        createdAt: 1702672064341,
        changedAt: 1702672064341,
    },
    {
        id: '2',
        title: 'Second Record',
        createdAt: 1702672064541,
        changedAt: 1702672064541,
    },
    {
        id: '3',
        title: 'Third Record',
        hidden: 'password',
        createdAt: 1702672065541,
        changedAt: 1702672065541,
    }
];