import { Router } from 'express';

import * as endpoints from './constants/endpoints';
import * as userController from './controllers/user';
import * as todoController from './controllers/todo';
import jwtAuthenticate from './middlewares/jwtAuthenticate';
import { validateUserCreation, validateLogin } from './schemas/user';
import { validateAddTodo, validateUpdateTodo } from './schemas/todo';

const router = Router();

router.get('/', (req, res, next) => {
  res.json({
    name: 'todo-api',
    version: '1.0.0'
  });
});

router.post(endpoints.CREATE_USER, validateUserCreation, userController.createUser);

router.get(endpoints.GET_ALL_TODOS, jwtAuthenticate, todoController.getAllTodos);

router.get(endpoints.GET_TODO_BY_ID, jwtAuthenticate, todoController.getTodoById);

router.post(endpoints.ADD_TODO, jwtAuthenticate, validateAddTodo, todoController.addTodo);

router.delete(endpoints.REMOVE_TODO, jwtAuthenticate, todoController.removeTodo);

router.put(endpoints.UPDATE_TODO, jwtAuthenticate, validateUpdateTodo, todoController.updateTodo);

router.post(endpoints.LOGIN, validateLogin, userController.login);

export default router;
