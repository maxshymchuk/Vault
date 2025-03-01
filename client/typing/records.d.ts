type VaultRecordPending = {
    title: string;
    description?: string;
    hidden?: string;
};

type VaultRecord = UniqueItem<
    VaultRecordPending & {
        createdAt: number;
        updatetAt: number;
    }
>;
