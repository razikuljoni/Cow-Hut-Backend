import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import configs from './configs';

let server: Server;

process.on('uncaughtException', () => {
    process.exit(1);
});

async function main() {
    try {
        await mongoose.connect(configs.database_url as string);
        console.log('🆗 Database Connection Successful!');

        server = app.listen(configs.port, () =>
            console.log(`🆗 Server Listening on port ${configs.port}!`)
        );
    } catch (error: any) {
        console.log('🚫 Database Connection Faield ~ ', error.message);
    }

    process.on('unhandledRejection', () => {
        if (server) {
            server.close(() => {
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

main();

process.on('SIGTERM', () => {
    if (server) {
        server.close();
    }
});
