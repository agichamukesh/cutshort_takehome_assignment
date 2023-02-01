import { NextFunction, Request, Response } from 'express';
import { findAllUsers, updateUserDoc } from '../services/user.service';

export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAllUsers();
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};


export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resp = await updateUserDoc(req);
    res.status(200).json({
      status: 'success',
      data: {
        resp,
      },
    });
  } catch (err) {
    next(err);
  }
}