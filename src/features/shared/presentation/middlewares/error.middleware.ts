import {type Response, type NextFunction, type Request} from 'express';

import { type ErrorResponse, HttpCode, AppError } from '../../../../core';

export class ErrorMiddleware {

    public static handleError = (error: unknown, _: Request, res: Response<ErrorResponse>, next: NextFunction): void => {
        if (error instanceof AppError){
            const {message, name, stack, validationErrors} = error;
            const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
            res.statusCode = statusCode;
            res.json({name, message, validationErrors, stack});
        } else {
            const name = 'Internal server Error';
            const message = 'An internal server Error ocurred';
            const statusCode = HttpCode.INTERNAL_SERVER_ERROR;
            res.statusCode = statusCode;
            res.json({name, message});
        }
        next();
    }
}