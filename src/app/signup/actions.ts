"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { z } from "zod";

import db from "@/db";
import { users } from "@/db/schema";
import { lucia } from "@/lib/auth";

import { formSchema } from "./form";

export default async function Page() {}

export async function signup(formData: z.infer<typeof formSchema>) {
  const username = formData.username.toLocaleLowerCase() as string;
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      errors: { username: "Invalid username" },
    };
  } else if (
    (await db.select().from(users).where(eq(users.username, username))).length >
    0
  ) {
    return {
      errors: { username: "Username already exists" },
    };
  }
  const password = formData.password;
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      errors: { password: "Invalid password" },
    };
  }

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const userId = generateIdFromEntropySize(10); // 16 characters long

  await db.insert(users).values({
    id: userId,
    username: username,
    password_hash: passwordHash,
    first_name: formData.first_name,
    last_name: formData.last_name,
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}
