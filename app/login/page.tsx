"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { authenticate } from "@/app/actions/authActions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await authenticate(formData);

    if (result?.error) {
      setError(result.error);
      setPending(false);
    }
    // If successful, server action will redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-background to-muted/20">
      <Card className="p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login to Todo App</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
              disabled={pending}
            />
          </div>
          <div>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
              disabled={pending}
            />
          </div>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          {/* <span
            className="text-blue-500 hover:underline"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </span> */}
        </p>
      </Card>
    </div>
  );
}
