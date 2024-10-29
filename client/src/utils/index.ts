import { SyntheticEvent } from 'react';
import config from '../config';

function isVaultRecord(item: VaultRecord | VaultRecordPending): item is VaultRecord {
    return 'id' in item;
}

function stopPropagation(event: SyntheticEvent) {
    event.stopPropagation();
}

function getLocalStorage(): LocalStorage {
    return JSON.parse(localStorage.getItem(config.localStorageKey) ?? '{}');
}

function setLocalStorage(key: keyof LocalStorage, value?: string | null): void {
    const vault = getLocalStorage();
    localStorage.setItem(config.localStorageKey, JSON.stringify({ ...vault, [key]: value }));
}

export { isVaultRecord, stopPropagation, getLocalStorage, setLocalStorage };