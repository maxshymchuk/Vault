import { Request, Response } from 'express';
import * as recordsService from '../services/records.service';

function getToken(request: Request) {
    return request.headers.authorization ?? undefined;
}

const get = async (req: Request, res: Response) => {
    try {
        const records = await recordsService.get({ token: getToken(req) });
        res.status(200).json({ records });
    } catch (error) {
        res.status(403).json(error.message);
    }
};

const add = async (req: Request, res: Response) => {
    try {
        const records = await recordsService.add({ token: getToken(req), record: req.body });
        res.status(200).json({ records });
    } catch (error) {
        res.status(403).json(error.message);
    }
};

const remove = async (req: Request, res: Response) => {
    try {
        const records = await recordsService.remove({ token: getToken(req), id: req.body.id });
        res.status(200).json({ records });
    } catch (error) {
        res.status(403).json(error.message);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const records = await recordsService.update({ token: getToken(req), record: req.body });
        res.status(200).json({ records });
    } catch (error) {
        res.status(403).json(error.message);
    }
};

export { get, add, remove, update };
