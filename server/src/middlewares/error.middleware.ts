import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json('Server error');
};

export { errorMiddleware };