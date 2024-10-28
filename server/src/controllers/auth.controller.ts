import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

const check = async (req: Request, res: Response) => {
    res.status(200).json('Authenticated');
}

const signIn = async (req: Request, res: Response) => {
    try {
        const user = await authService.signIn(req.body);
        // for prod with HTTPS
        // res.cookie('token', user.token, {
        //     httpOnly: true,     
        //     secure: false,       
        //     sameSite: 'lax', 
        //     maxAge: 3600 * 1000 
        // });
        // res.status(200).json('Successful sign in');
        res.status(200).json({ token: user.token });
    } catch (error) {
        res.status(403).json(error.message);
    }
};

const signUp = async (req: Request, res: Response) => {
    try {
        const token = await authService.signUp(req.body);
        // for prod with HTTPS
        // res.cookie('token', token, {
        //     httpOnly: true,     
        //     secure: false,       
        //     sameSite: 'lax', 
        //     maxAge: 3600 * 1000 
        // });
        // res.status(200).json('Successful sign up');
        res.status(200).json({ token });
    } catch (error) {
        res.status(403).json(error.message);
    }
};

export { check, signIn, signUp };