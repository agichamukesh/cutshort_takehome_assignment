import express from 'express';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { generateComment } from '../controllers/comment.controller'
import { getComments } from '../controllers/post.controller'

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/:postId', generateComment);

router.get('/:postId', getComments);


export default router;
