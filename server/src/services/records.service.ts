import { dbs } from '../config/database';
import { promisify } from '../utils';
import { randomUUID } from 'node:crypto';

type WithToken<T = {}> = T & {
    token?: string;
}

type CreateVaultRecord = {
    title: string;
    description?: string;
    hidden?: string;
}

type UpdateVaultRecord = {
    id: string;
    title: string;
    description?: string;
    hidden?: string;
    createdAt: number;
    updatedAt: number;
}

function createRecord(record: CreateVaultRecord): VaultRecord {
    return { ...record, id: randomUUID(), createdAt: Date.now(), updatedAt: Date.now() };
}

function updateRecord(record: UpdateVaultRecord): VaultRecord {
    return { ...record, updatedAt: Date.now() };
}

async function get({ token }: WithToken): Promise<Array<VaultRecord>> {
    const user = dbs.users.open('users').get().find(user => user.token === token);
    if (!user) throw new Error('User not found. Please, relogin to the app');
    return promisify(() => dbs.records.open('records').get(user.id) ?? []);
}

async function add({ token, record }: WithToken<{ record: CreateVaultRecord }>): Promise<Array<VaultRecord>> {
    const newRecord = createRecord(record);
    const user = dbs.users.open('users').get().find(user => user.token === token);
    if (!user) throw new Error('User not found. Please, relogin to the app');
    const records = dbs.records.open('records');
    if (records.get(user.id)) {
        records.open(user.id).add(newRecord)
    } else {
        records.add(user.id, [newRecord])
    }
    return promisify(() => records.get(user.id) ?? [])
}

async function remove({ token, id }: WithToken<{ id: string }>): Promise<Array<VaultRecord>> {
    const user = dbs.users.open('users').get().find(user => user.token === token);
    if (!user) throw new Error('User not found. Please, relogin to the app');
    const records = dbs.records.open('records');
    if (records.get(user.id)) records.open(user.id).remove(id);
    return promisify(() => records.get(user.id) ?? []);
}

async function update({ token, record }: WithToken<{ record: UpdateVaultRecord }>): Promise<Array<VaultRecord>> {
    const newRecord = updateRecord(record);
    const user = dbs.users.open('users').get().find(user => user.token === token);
    if (!user) throw new Error('User not found. Please, relogin to the app');
    const records = dbs.records.open('records');
    if (records.get(user.id)) records.open(user.id).update(record.id, newRecord);
    return promisify(() => records.get(user.id) ?? []);
}

export { get, add, remove, update };