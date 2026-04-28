import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function rotaMe(req: Request, res: Response) {
  const token = req.cookies?.token;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return res.json(decoded);
  } catch {
    return res.sendStatus(401);
  }
}