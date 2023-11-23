import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/models/todo.model';

export const addTodo = createAction(
  '[Todos] Add Todo',
  props<{ todo: Todo }>(),
);

export const toggleTodo = createAction(
  '[Todos] Toggle Todo',
  props<{ id: string }>(),
);

export const deleteTodo = createAction(
  '[Todos] Delete Todo',
  props<{ id: string }>(),
);
