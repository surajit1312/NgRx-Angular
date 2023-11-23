import { createReducer, on } from '@ngrx/store';
import { Todo } from '../../app/models/todo.model';
import {
  addTodoAction,
  deleteTodoAction,
  toggleTodoAction,
} from '../actions/todo.actions';

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: [
    {
      id: '1',
      title: 'Todo 1',
      completed: false,
      userId: 1,
    },
  ],
};

export const TodosReducer = createReducer(
  initialState,
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
