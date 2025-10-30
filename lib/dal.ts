import "server-only";
import { cache } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const userId = session.user.id || session.user.email;

  return { isAuth: true, userId };
});
