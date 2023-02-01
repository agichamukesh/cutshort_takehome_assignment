import { NextFunction, Request, Response } from 'express';
import { createPost, updatePostDoc, deletePostDoc, getCommentDocs, getPostDocs } from '../services/post.service';

export const generatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let userId = res.locals.user._id;
    const resp = await createPost(req.body, userId);
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

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resp = await updatePostDoc(req);
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

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resp = await deletePostDoc(req);
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

export const getComments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const resp = await getCommentDocs(req);
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

  export const getPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let userId;
      let paramId = req.query.userId;
      userId = paramId ? paramId : res.locals.user._id;
      const resp = await getPostDocs(userId);
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
  