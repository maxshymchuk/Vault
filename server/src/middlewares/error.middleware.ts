import { Request, Response } from 'express';

const errorMiddleware = (err: unknown, req: Request, res: Response) => {
    console.error(err);
    res.status(500).json('Server error');
};

export { errorMiddleware };
