function getEnvValue(key: string, defaultValue: string): string;
function getEnvValue(key: string, defaultValue: number): number;
function getEnvValue(key: string, defaultValue: boolean): boolean;
function getEnvValue<T = number | string | boolean>(key: string, defaultValue: T): T {
    const test = process.env[key];
    if (test == undefined) return defaultValue;
    try {
        switch (typeof defaultValue) {
            case 'number': {
                if (isNaN(+test)) throw Error();
                return +test as T;
            }
            case 'boolean':
                return (test.toLowerCase() === 'true') as T;
            case 'string':
                return test as T;
            default:
                throw Error();
        }
    } catch {
        console.log(`Env value ${key} replaced with default ${defaultValue}`);
        return defaultValue;
    }
}

const config = {
    port: getEnvValue('PORT', 3000),
    allowedOrigins: getEnvValue('ALLOWED_ORIGINS', '*'),
    apiDelay: getEnvValue('API_DELAY', 0),
} as const;

export { config };
