type VaultRecordPublic = {
    title: string;
    description?: string;
    hidden?: string;
}

type VaultRecord = VaultRecordPublic & {
    id: string;
    createdAt: number;
    changedAt: number;
}

export type { VaultRecord, VaultRecordPublic };