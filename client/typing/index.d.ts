type Nullable<T> = T | null;

type ValueOf<T> = T[keyof T];

type LocalStorage = Partial<{
    token: string;
}>;

type UniqueItem<T = object> = T & {
    id: string;
};
