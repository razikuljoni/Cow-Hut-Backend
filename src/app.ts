import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { NOT_FOUND } from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import router from './app/routes';

// Module Routes
import { AuthRoutes } from './app/modules/auth/auth.router';
import { CowRoutes } from './app/modules/cow/cow.route';
import { OrderRoutes } from './app/modules/order/order.route';
import { UserRoutes } from './app/modules/user/user.router';
import { AdminRoutes } from './app/modules/admin/admin.route';

const app = express();

// Cors setup
app.use(cors());

// Parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Application routes
// app.use('/api/v1/', router);
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/cows', CowRoutes);
app.use('/api/v1/orders', OrderRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/admins', AdminRoutes);

// Heartbeat route
app.all('/', (req: Request, res: Response) => {
    res.send('💓 Server is running....');
});

// Global Error Handler
app.use(globalErrorHandler);

// Handle Not Found Route
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(NOT_FOUND).json({
        success: false,
        message: '🚫 Not Found!',
        errorMessages: [
            {
                path: req.originalUrl,
                message: '🚫 Api not found!',
            },
        ],
    });
    next();
});

export default app;
