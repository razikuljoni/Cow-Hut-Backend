import cors from 'cors';
import express from 'express';
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

export default app;
