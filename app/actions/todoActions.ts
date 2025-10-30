"use server";

import { verifySession } from "@/lib/dal";
import { prisma } from "@/lib/db";
import { isValidString } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function fetchTodos() {
  const { userId } = await verifySession();
  return await prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function createTodo(formData: FormData) {
  const { userId } = await verifySession();

  const title = formData.get("title") as string;

  if (isValidString(title)) {
    return { error: "Title is required" };
  }
  await prisma.todo.create({
    data: {
      title: title.trim(),
      userId,
    },
  });

  revalidatePath("/");

  return { success: true };
}

export async function toggleTodo(id: string, completed: boolean) {
  const { userId } = await verifySession();

  await prisma.todo.updateMany({
    where: { id, userId },
    data: { completed },
  });

  revalidatePath("/");
}
export async function removeTodo(id: string) {
  const { userId } = await verifySession();

  await prisma.todo.deleteMany({
    where: { id, userId },
  });

  revalidatePath("/");
}

export async function editTodo(id: string, title: string) {
  const { userId } = await verifySession();

  if (!title || title.trim() === "") {
    return { error: "Title is required" };
  }

  await prisma.todo.updateMany({
    where: { id, userId },
    data: { title: title.trim() },
  });

  revalidatePath("/");
  return { success: true };
}
