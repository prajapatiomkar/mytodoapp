import { Card } from "@/components/ui/card";
import { Todo } from "@/lib/types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
}
export default function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        No todos yet. Add on above to get started.
      </Card>
    );
  }
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div>
      {activeTodos.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">
            Active ({activeTodos.length})
          </h2>
          {activeTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}

      {completedTodos.length > 0 && (
        <div>
          <h2 className="">Completed ({completedTodos.length})</h2>
          {completedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}
