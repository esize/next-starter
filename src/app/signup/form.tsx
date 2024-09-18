"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { signup } from "./actions";

export const formSchema = z
  .object({
    first_name: z.string(),
    last_name: z.string(),
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    username: z
      .string()
      .min(4, { message: "Username must be at least 4 characters" })
      .max(31, { message: "Username must be at most 31 characters" })
      .regex(/^[a-z0-9_-]+$/, {
        message:
          "Username must only consist of lowercase letters, 0-9, -, and _",
      }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(255, { message: "Password must be at most 255 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  });

  const action: () => void = form.handleSubmit(async (data) => {
    const response = await signup(data);
    if (response.errors) {
      type keyType =
        | "username"
        | "password"
        | "first_name"
        | "last_name"
        | "root"
        | `root.${string}`;
      for (const [key, value] of Object.entries(response.errors)) {
        form.setError(key as keyType, { message: value });
      }
    }
  });
  return (
    <>
      <Form {...form}>
        <form action={action} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Evan" tabIndex={1} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Robinson" tabIndex={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" tabIndex={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" tabIndex={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" tabIndex={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" tabIndex={6} className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
