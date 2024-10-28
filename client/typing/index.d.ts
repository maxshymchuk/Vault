type Nullable<T> = T | null;

type ValueOf<T> = T[keyof T];

type LocalStorage = Partial<{
    token: string;
}>

type UniqueItem<T = {}> = T & {
    id: string;
}