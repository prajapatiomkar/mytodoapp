"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { signup } from "@/app/actions/authActions";
import Link from "next/link";
export default function SignupPage() {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const result = await signup(formData);

    if (result?.errors) {
      setErrors(result.errors);
    } else if (result?.error) {
      setErrors({ general: result.error });
    } else {
      router.push("/login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <Input name="name" placeholder="Name" required />
            {errors?.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
            )}
          </div>
          <div>
            <Input name="email" type="email" placeholder="Email" required />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
            )}
          </div>
          <div>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
            />
            {errors?.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
            )}
          </div>
          {errors?.general && (
            <p className="text-red-500 text-sm">{errors.general}</p>
          )}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?&nbsp;
          <Link className="text-blue-500 hover:underline" href="/login">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
