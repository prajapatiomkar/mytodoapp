import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { fetchTodos } from "./actions/todoActions";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { handleSignOut } from "./actions/authActions";

export default async function Home() {
  const todos = await fetchTodos();
  const session = await auth();

  return (
    <main className="min-h-screen bg-linear-to-b from-background to-muted/20 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">My Todo App</h1>
            <p className="text-muted-foreground">
              Welcome, {session?.user?.name}!
            </p>
          </div>
          <form action={handleSignOut}>
            <Button variant="outline" type="submit">
              Logout
            </Button>
          </form>
        </div>

        <TodoForm />
        <TodoList todos={todos} />
      </div>
    </main>
  );
}
