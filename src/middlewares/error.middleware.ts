import { Request, Response, NextFunction } from 'express';
import { customResponse } from '../utils/response';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    customResponse(res, status, message, null, err.errors || err.message);
};
