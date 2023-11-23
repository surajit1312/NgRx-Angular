import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/models/todo.model';

export const loadTodoAction = createAction(
  '[Todos] Load Todo',
  props<{ todos: Todo[] }>(),
);

export const addTodoAction = createAction(
  '[Todos] Add Todo',
  props<{ todo: Todo }>(),
);

export const toggleTodoAction = createAction(
  '[Todos] Toggle Todo',
  props<{ id: string }>(),
);

export const deleteTodoAction = createAction(
  '[Todos] Delete Todo',
  props<{ id: string }>(),
);
