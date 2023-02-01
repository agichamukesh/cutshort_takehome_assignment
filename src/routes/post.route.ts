import express from 'express';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import {generatePost, updatePost, deletePost, getPosts } from '../controllers/post.controller'
const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/', generatePost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

router.get('/', getPosts);


export default router;