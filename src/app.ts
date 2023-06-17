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

// app.get('/api/v1', (req: Request, res: Response, next: NextFunction) => {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Not implemented');
// });

// Global Error Handler
app.use(globalErrorHandler);

export default app;
