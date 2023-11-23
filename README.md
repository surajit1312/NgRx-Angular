# NgRxAngular

This project is to demonstrate the flow of state management using NgRx(Redux) and Angular v16.

## Create a new angular project with specifix version v16.2.10

```
npx @angular/cli@16.2.10 new NgRx-Angular

```

## Install NgRx dependencies

```
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools --save

```

### or with specific version as

```
npm install @ngrx/store@16.2.0 --save
npm install @ngrx/effects@16.2.0 --save
npm install @ngrx/entity@16.2.0 --save
npm install @ngrx/store-devtools@16.2.0 --save

```

## NgRx changes

### Create a Model file - 'todo.model.ts'

```
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

```

### Create an Action file - 'todo.actions.ts' for todo for create(add), toggle(update) and delete

```
import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/models/todo.model';

export const addTodo = createAction(
  '[Todos] Add Todo',
  props<{ todo: Todo }>()
);

export const toggleTodo = createAction(
  '[Todos] Toggle Todo',
  props<{ id: string }>()
);

export const deleteTodo = createAction(
  '[Todos] Delete Todo',
  props<{ id: string }>()
);

```

### Create a Reducer file - 'todo.reducer.ts' for each actions as stated above

```
import { createReducer, on } from '@ngrx/store';
import { Todo } from '../../app/models/todo.model';
import { addTodo, deleteTodo, toggleTodo } from '../actions/todo.actions';

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: [],
};

export const todosReducer = createReducer(
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
        : todoItem
    ),
  }))
);

```

### Add required Modules in 'app.module.ts' as shown below:

```
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ todosReducer: TodosReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})

```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
