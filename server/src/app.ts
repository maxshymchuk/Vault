import express from 'express';
import authRoutes from './routes/auth.routes';
import recordRoutes from './routes/record.routes';
import recordsRoutes from './routes/records.routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { config } from './config';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', config.allowedOrigins);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/record', recordRoutes);
app.use('/api/records', recordsRoutes);

app.use(errorMiddleware);

export default app;