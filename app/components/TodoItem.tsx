"use client";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/lib/types";
import { editTodo, removeTodo, toggleTodo } from "../actions/todoActions";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Pencil, Trash2, X } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  async function handleToggle() {
    await toggleTodo(todo.id, !todo.completed);
  }
  async function handleDelete() {
    await removeTodo(todo.id);
  }
  async function handleEdit() {
    const result = await editTodo(todo.id, editTitle);
    if (result?.success) {
      setIsEditing(false);
    }
  }

  return (
    <Card className="p-4 mb-2">
      <div className="flex items-center gap-3">
        <Checkbox checked={todo.completed} onCheckedChange={handleToggle} />
        {isEditing ? (
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1"
          />
        ) : (
          <span
            className={`flex-1 ${
              todo.completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {todo.title}
          </span>
        )}

        {todo.completed && <Badge variant="secondary">Completed</Badge>}

        <div className="">
          {isEditing ? (
            <>
              <Button size="icon" variant="ghost" onClick={handleEdit}>
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={handleDelete}>
                {" "}
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
