import app from './app';
import { config } from './config';
import { dbs } from './config/database';

dbs.prepare()
    .then(() => {
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    })
    .catch(error => {
        console.error('Failed to connect to databases:', error);
    });