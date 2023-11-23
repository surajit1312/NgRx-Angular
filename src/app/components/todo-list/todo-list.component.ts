import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { Store } from '@ngrx/store';
import {
  addTodoAction,
  deleteTodoAction,
  toggleTodoAction,
} from 'src/store/actions/todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  newTodoTitle: string = '';
  todos$!: Todo[];

  constructor(private store: Store<{ todosReducer: { todos: Todo[] } }>) {
    store.select('todosReducer').subscribe((todosState: { todos: Todo[] }) => {
      this.todos$ = todosState.todos;
    });
  }

  addTodo(): void {
    if (this.newTodoTitle.trim() === '') {
      return;
    }
    const todo: Todo = {
      id: Date.now().toString(),
      title: this.newTodoTitle,
      completed: false,
      userId: 1,
    };
    this.store.dispatch(addTodoAction({ todo }));
    this.newTodoTitle = '';
  }

  toggleTodo(id: string): void {
    this.store.dispatch(toggleTodoAction({ id }));
  }

  removeTodo(id: string): void {
    this.store.dispatch(deleteTodoAction({ id }));
  }
}
