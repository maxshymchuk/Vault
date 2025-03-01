import { dbs } from '../config/database';
import { base64, promisify } from '../utils';
import { randomUUID } from 'node:crypto';

function createUser({ email, password }: Creds): VaultUser {
    return {
        id: randomUUID(),
        email,
        password,
        createdAt: Date.now(),
        token: base64.encode(randomUUID()),
    };
}

async function signUp(creds: Creds): Promise<string> {
    const user = createUser(creds);
    const emails = dbs.users
        .open('users')
        .get()
        .map((user) => user.email);
    if (emails.includes(user.email)) throw new Error('This email already signed up');
    dbs.users.open('users').add(user);
    return promisify(() => user.token as string);
}

async function signIn({ email, password }: Creds): Promise<VaultUser> {
    const user = dbs.users
        .open('users')
        .get()
        .find((user) => user.email === email && user.password === password);
    if (!user) throw new Error('User not found');
    return promisify(() => user);
}

export { signIn, signUp };
