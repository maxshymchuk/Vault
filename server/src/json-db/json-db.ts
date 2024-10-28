import { createDatabaseFile, updateDatabaseFile } from './utils';

type Props<T> = {
    name: string;
    path?: string;
}

type Item<T = { [key: string]: unknown }> = T & { id: string; }

function isItem(obj: any): obj is Item {
    return !!obj.id;
}

function isArray<T>(obj: any): obj is Array<T> {
    return Array.isArray(obj);
}

function isObject<T>(obj: any): obj is T {
    return obj !== null && typeof obj === 'object' && !isArray(obj);
}

class JsonDB<R, T = R> {
    private _name: string;
    private _path: string;
    private _filePath: string;

    private _data: R;
    private _current: T;

    get data() {
        return this._data;
    }

    get current() {
        return this._current;
    }

    get name() {
        return this._name;
    }

    get path() {
        return this._path;
    }

    constructor({ name, path = 'databases' }: Props<T>) {
        this._name = name;
        this._path = path;
        this._filePath = `${this._path}/${this._name}.json`;
    }

    public async init(defaultValue: R): Promise<JsonDB<R, T>> {
        const data = await createDatabaseFile(this._filePath, defaultValue);
        this._data = data;
        this._current = data as T;
        return this;
    }

    public open<K extends keyof T>(key: K): JsonDB<R, T[K]> {
        if (isObject(this._current)) {
            const next = new JsonDB<R, T[K]>({ name: this._name });
            next._data = this._data;
            next._current = this._current[key];
            return next;
        } else {
            throw new Error('Open method supports Objects only');
        }
    }

    public get(): T;
    public get<K extends keyof T>(key: K): T[K];
    public get<K extends keyof T>(key?: K): T | T[K] {
        if (isObject(this._current) && key !== undefined) {
            return this._current[key];
        }
        return this._current;
    }

    public async add(value: T extends Array<infer U> ? U : never): Promise<JsonDB<R, T>>;
    public async add<K extends keyof T>(key: K, value: T[K]): Promise<JsonDB<R, T>>;
    public async add<K extends keyof T>(keyOrValue: K | T[K], value?: T[K]): Promise<JsonDB<R, T>> {
        if (isArray(this._current)) {
            if (isItem(keyOrValue)) {
                this._current.push(keyOrValue);
            } else {
                throw new Error('Value must contain id');
            }
        } else if (isObject(this._current)) {
            if (typeof keyOrValue === 'string' && value !== undefined) {
                (this._current as Record<string, unknown>)[keyOrValue] = value; // Record<string, any>
            } else {
                throw new Error('Key<string> and Value required to add to an Object');
            }
        } else {
            throw new Error('Add method supports Object and Arrays only');
        }
        await updateDatabaseFile(this._filePath, this._data);
        return this;
    }

    // public add(keyOrValue: Item | string, value?: unknown): JsonDB<T> {
    //     if (isArray(this._data)) {
    //         if (isItem(keyOrValue)) {
    //             this._data.push(keyOrValue);
    //         } else {
    //             throw new Error('Value must contain id');
    //         }
    //     } else if (isObject(this._data)) {
    //         if (typeof keyOrValue === 'string' && value !== undefined) {
    //             this._data[keyOrValue] = value;
    //         } else {
    //             throw new Error('Key<string> and Value required to add to an Object');
    //         }
    //     } else {
    //         throw new Error('Only for object or arrays');
    //     }
    //     return this;
    // }

    public async remove(id: string): Promise<JsonDB<R, T>>;
    public async remove<K extends keyof T>(key: K): Promise<JsonDB<R, T>>;
    public async remove<K extends keyof T>(keyOrId: K | string): Promise<JsonDB<R, T>> {
        if (isArray<Item>(this._current)) {
            const index = this._current.findIndex(item => item.id === keyOrId);
            if (index !== -1) this._current.splice(index, 1);
        } else if (typeof keyOrId === 'string' && isObject(this._current)) {
            delete (this._current as Record<string, unknown>)[keyOrId]; // Record<string, any>
        } else {
            throw new Error('Remove method supports Object and Arrays only');
        }
        await updateDatabaseFile(this._filePath, this._data);
        return this;
    }

    // public remove<K extends keyof T>(keyOrId: K | string): JsonDB<T> {
    //     if (Array.isArray(this._data)) {
    //         this._data = this._data.filter(item => item.id !== keyOrId) as T;
    //     } else if (isObject(this._data)) {
    //         delete this._data[keyOrId as K];
    //     } else {
    //         throw new Error('Only for object or arrays');
    //     }
    //     return this;
    // }

    public async update<K extends keyof T>(id: string, value: T[K]): Promise<JsonDB<R, T>>;
    public async update<K extends keyof T>(key: K, value: T[K]): Promise<JsonDB<R, T>>;
    public async update<K extends keyof T>(keyOrId: K | string, value: T[K]): Promise<JsonDB<R, T>> {
        if (isArray<Item>(this._current)) {
            const item = this._current.find(item => item.id === keyOrId);
            if (item) Object.assign(item, value);
        } else if (typeof keyOrId === 'string' && isObject(this._current)) {
            if (keyOrId in (this._current as Record<string, unknown>)) {
                Object.assign((this._current as Record<string, unknown>)[keyOrId], value);
            }
        } else {
            throw new Error('Update method supports Object and Arrays only');
        }
        await updateDatabaseFile(this._filePath, this._data);
        return this;
    }

    // public update<K extends keyof T>(key: K, value: T[K]): JsonDB<R, T> {
    //     this._current[key] = value;
    //     return this;
    // }
}

export default JsonDB;