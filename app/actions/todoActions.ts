"use server";

import { addTodos, deleteTodo, getTodos, updateTodo } from "@/lib/store";
import { Todo } from "@/lib/types";
import { isValidString } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function fetchTodos() {
  return getTodos();
}

export async function createTodo(formData: FormData) {
  const title = formData.get("title") as string;
  if (isValidString(title)) {
    return { error: "Title is required" };
  }

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: new Date(),
  };
  addTodos(newTodo);
  revalidatePath("/");

  return { success: true };
}

export async function toggleTodo(id: string, completed: boolean) {
  updateTodo(id, { completed });
  revalidatePath("/");
}

export async function removeTodo(id: string) {
  deleteTodo(id);
  revalidatePath("/");
}

export async function editTodo(id: string, title: string) {
  if (!title || title.trim() === "") {
    return { error: "Title is required" };
  }

  updateTodo(id, { title: title.trim() });
  revalidatePath("/");

  return { success: true };
}
