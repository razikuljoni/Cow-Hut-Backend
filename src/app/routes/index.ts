import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.router';
import { CowRoutes } from '../modules/cow/cow.route';
import { OrderRoutes } from '../modules/order/order.route';
import { UserRoutes } from '../modules/user/user.router';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/cows',
        route: CowRoutes,
    },
    {
        path: '/orders',
        route: OrderRoutes,
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
