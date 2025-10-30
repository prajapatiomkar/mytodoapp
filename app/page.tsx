import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { fetchTodos } from "./actions/todoActions";

export default async function Home() {
  const todos = await fetchTodos();

  return (
    <main className="min-h-screen bg-linear-to-b from-background to-muted/20 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">My Todo App</h1>
          <p className="text-muted-foreground">
            Built with Next.js 15 & shadcn/ui
          </p>
        </div>

        <TodoForm />
        <TodoList todos={todos} />
      </div>
    </main>
  );
}
