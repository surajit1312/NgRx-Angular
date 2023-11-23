import { createReducer, on } from '@ngrx/store';
import { Todo } from '../../app/models/todo.model';
import {
  addTodoAction,
  deleteTodoAction,
  loadTodoAction,
  toggleTodoAction,
} from '../actions/todo.actions';

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: [],
};

export const TodosReducer = createReducer(
  initialState,
  on(loadTodoAction, (state, { todos }) => ({
    ...state,
    todos,
  })),
  on(addTodoAction, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
  })),
  on(deleteTodoAction, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todoItem: Todo) => todoItem.id !== id),
  })),
  on(toggleTodoAction, (state, { id }) => ({
    ...state,
    todos: state.todos.map((todoItem: Todo) =>
      todoItem.id == id
        ? {
            ...todoItem,
            completed: !todoItem.completed,
          }
        : todoItem,
    ),
  })),
);
