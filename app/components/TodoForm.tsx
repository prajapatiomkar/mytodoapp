"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { createTodo } from "../actions/todoActions";
import { Button } from "@/components/ui/button";

export default function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const result = await createTodo(formData);
    if (result?.success) {
      formRef.current?.reset();
    }
  }
  return (
    <Card className="p-6 mb-6">
      <form ref={formRef} action={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Add a new todo..."
          className="flex-1"
          required
        />
        <Button className="mt-2" type="submit">
          Add Todos
        </Button>
      </form>
    </Card>
  );
}
