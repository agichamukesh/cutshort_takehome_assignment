import express from 'express';
import {
  getAllUsersHandler,
  getMeHandler,
} from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';
import {generateTodo, updateToDo, deleteToDo, getToDos } from '../controllers/todo.controller'
const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/', generateTodo);

router.put('/:id', updateToDo);

router.delete('/:id', deleteToDo);

router.get('/', getToDos);


export default router;
