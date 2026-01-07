import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || '3000',
    database_url: process.env.DATABASE_URL || '',
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND || '10',
    jwt: {
        secret: process.env.JWT_SECRET || 'change-me-in-env',
        expires_in: process.env.JWT_EXPIRES_IN || '1d',
        refresh_secret: process.env.JWT_REFRESH_SECRET || 'change-me-too',
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
};
