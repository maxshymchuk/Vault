import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    allowedOrigins: process.env.ALLOWED_ORIGINS || '*',
    dev: {
        delay: process.env.DEV_DELAY || 100
    }
}

export { config };