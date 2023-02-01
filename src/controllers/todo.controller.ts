import { NextFunction, Request, Response } from 'express';
import { createToDo, updateToDoDoc, deleteToDoDoc, getToDoDocs } from '../services/todo.service';

export const generateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let userId = res.locals.user._id;
    const resp = await createToDo(req.body, userId);
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

export const updateToDo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resp = await updateToDoDoc(req);
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

export const deleteToDo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resp = await deleteToDoDoc(req);
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

export const getToDos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let userId;
    let paramId = req.query.userId;
    userId = paramId ? paramId : res.locals.user._id;
    const resp = await getToDoDocs(userId);
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
