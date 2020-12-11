import { Request, Response } from 'express';
import UserService from './UserService';

export const create = async (req: Request, res: Response) => {
  const response = await UserService.create(req.body);
  return res.json(response);
};

export const consume = async (_: Request, res: Response) => {
  const response = await UserService.consume();
  return res.json(response);
};
