import { JsonDB } from '../json-db';

type UsersDB = {
    users: Array<VaultUser>;
}

type RecordsDB = {
    records: Record<string, Array<VaultRecord>>;
}

const defaultUsers: UsersDB = {
    users: []
}

const defaultRecords: RecordsDB = {
    records: {}
}

class DatabasesManager {
    private _usersDB = new JsonDB<UsersDB>({ name: 'users' })
    private _recordsDB = new JsonDB<RecordsDB>({ name: 'records' })

    get users() {
        return this._usersDB;
    }

    get records() {
        return this._recordsDB;
    }

    public async prepare() {
        await Promise.all([
            this._usersDB.init(defaultUsers),
            this._recordsDB.init(defaultRecords)
        ]);
    }
}

export const dbs = new DatabasesManager();