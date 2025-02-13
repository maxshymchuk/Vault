import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (token) {
        next();
    } else {
        next(res.status(401).json('Not authenticated'));
    }
};

export { authMiddleware };