import { config } from '../config';

function jsonStringify(obj: unknown) {
    return JSON.stringify(obj, null, '  ');
}

const base64 = {
    decode: (s: string) => Buffer.from(s, 'base64'),
    encode: (b: string) => Buffer.from(b).toString('base64')
};

function promisify<T>(func: () => T, delay = config.apiDelay): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(func());
            } catch (error) {
                reject(error)
            }
        }, delay)
    });
}

export { base64, jsonStringify, promisify };