import { createReducer, on } from '@ngrx/store';
import { Todo } from '../../app/models/todo.model';
import { addTodo, deleteTodo, toggleTodo } from '../actions/todo.actions';

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: [],
};

export const TodosReducer = createReducer(
  initialState,
  on(addTodo, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
  })),
  on(deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todoItem: Todo) => todoItem.id !== id),
  })),
  on(toggleTodo, (state, { id }) => ({
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
