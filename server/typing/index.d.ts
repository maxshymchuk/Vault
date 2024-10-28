type Creds = {
    email: string;
    password: string;
}

type VaultUser = {
    id: string;
    email: string;
    password: string;
    createdAt: number;
    lastLoginAt?: number;
    token?: string;
    tokenExpiration?: number;
}

type VaultRecord = {
    id: string;
    title: string;
    description?: string;
    hidden?: string;
    createdAt: number;
    updatedAt: number;
}