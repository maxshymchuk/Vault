import { dbs } from '../config/database';
import { v4 as uuidv4 } from 'uuid';
import { base64, promisify } from '../utils';

function createUser({ email, password }: Creds): VaultUser {
    return {
        id: uuidv4(),
        email,
        password,
        createdAt: Date.now(),
        token: base64.encode(uuidv4())
    }
}

async function signUp(creds: Creds): Promise<string> {
    const user = createUser(creds);
    const emails = dbs.users.open('users').get().map(user => user.email);
    if (emails.includes(user.email)) throw new Error('This email already signed up');
    dbs.users.open('users').add(user);
    return promisify(() => user.token);
}

async function signIn({ email, password }: Creds): Promise<VaultUser> {
    const user = dbs.users.open('users').get().find(user => user.email === email && user.password === password);
    if (!user) throw new Error('User not found');
    return promisify(() => user);
}

export { signIn, signUp };