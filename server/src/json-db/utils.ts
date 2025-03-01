import path from 'node:path';
import { access, mkdir, readFile, writeFile, constants } from 'node:fs/promises';
import { jsonStringify } from '../utils';

async function createDatabaseFile<T>(pathToFile: string, defaultValue?: T): Promise<T> {
    await mkdir(path.dirname(pathToFile), { recursive: true });
    try {
        await access(pathToFile, constants.X_OK);
    } catch {
        await writeFile(pathToFile, defaultValue ? jsonStringify(defaultValue) : '{}');
    }
    const data = await readFile(pathToFile, { encoding: 'utf-8' });
    return JSON.parse(data);
}

async function updateDatabaseFile<T>(pathToFile: string, value?: T): Promise<void> {
    try {
        await writeFile(pathToFile, jsonStringify(value));
    } catch {
        console.log('Error updating a database');
    }
}

export { createDatabaseFile, updateDatabaseFile };
