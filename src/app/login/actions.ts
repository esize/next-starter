"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { z } from "zod";

import db from "@/db";
import { users } from "@/db/schema";
import { lucia } from "@/lib/auth";

import { formSchema } from "./form";

export async function login(formData: z.infer<typeof formSchema>) {
  const username = formData.username as string;
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      errors: { root: "Incorrect username or password" },
    };
  }
  const password = formData.password as string;
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      errors: { root: "Incorrect username or password" },
    };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username.toLocaleLowerCase()),
  });
  if (!existingUser) {
    return {
      errors: { root: "Incorrect username or password" },
    };
  }

  const validPassword = await verify(existingUser.password_hash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  if (!validPassword) {
    return {
      errors: { root: "Incorrect username or password" },
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}
