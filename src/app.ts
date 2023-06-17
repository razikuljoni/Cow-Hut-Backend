import cors from 'cors';
import express from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
const app = express();

// Cors setup
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/', router);

// app.get('/api/v1', async (req: Request, res: Response, next: NextFunction) => {
//     next(Promise.reject(new Error('Unhandle Promise Rejection')));
// });

// Global Error Handler
app.use(globalErrorHandler);

export default app;
