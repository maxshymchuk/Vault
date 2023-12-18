export type User = {
    nickname: string;
}

export type Auth = {
    user: User | null;
    token: string | null;
    isLogged: boolean;
}