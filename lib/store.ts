import { Todo } from "./types";

let todos: Todo[] = [];

export const getTodos = () => todos;

export const addTodos = (todo: Todo) => {
  todos.push(todo);
};

export const updateTodo = (id: string, updates: Partial<Todo>) => {
  todos = todos.map((todo) => (todo.id == id ? { ...todo, ...updates } : todo));
};

export const deleteTodo = (id: string) => {
  todos = todos.filter((todo) => todo.id != id);
};
