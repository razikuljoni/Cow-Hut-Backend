import mongoose from 'mongoose';
import app from './app';
import configs from './configs';

async function main() {
    try {
        await mongoose.connect(configs.database_url as string);
        console.log('🆗 Database Connection Successfull!');

        app.listen(configs.port, () =>
            console.log(`🆗 Server Listening on port ${configs.port}!`)
        );
    } catch (error: any) {
        console.log('🚫 Database Connection Faield ~ ', error.message);
    }
}

main();
