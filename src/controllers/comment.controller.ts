import { NextFunction, Request, Response } from 'express';
import { createComment } from '../services/comment.service';

export const generateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let userId = res.locals.user._id;
    const resp = await createComment(req.body, req.params.postId, userId);
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