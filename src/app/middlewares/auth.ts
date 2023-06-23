import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import { FORBIDDEN, UNAUTHORIZED } from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import configs from '../../configs';
import { Secret } from 'jsonwebtoken';

// Extend the Request interface to include the 'user' property
declare module 'express' {
    // eslint-disable-next-line
    interface Request {
        user?: any;
    }
}
const auth =
    (...requiredRoles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiError(UNAUTHORIZED, '🚫 You are not authorized!');
            }

            let verifiedToken = null;

            verifiedToken = jwtHelpers.verifyToken(
                token,
                configs.jwt.secret as Secret
            );

            req.user = verifiedToken;

            if (
                requiredRoles.length &&
                !requiredRoles.includes(verifiedToken.role)
            ) {
                throw new ApiError(FORBIDDEN, '🚫 Forbidden Access!');
            }

            next();
        } catch (error) {
            next(error);
        }
    };

export default auth;
