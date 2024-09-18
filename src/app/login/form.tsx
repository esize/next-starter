"use client";

import Link from "next/link";

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

import { login } from "./actions";

export const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" })
    .max(31, { message: "Username must be at most 31 characters" })
    .regex(/^[a-z0-9_-]+$/, {
      message: "Username must only consist of lowercase letters, 0-9, -, and _",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(255, { message: "Password must be at most 255 characters" }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const action: () => void = form.handleSubmit(async (data) => {
    const response = await login(data);
    if (response.errors) {
      type keyType = "username" | "password" | "root" | `root.${string}`;
      for (const [key, value] of Object.entries(response.errors)) {
        form.setError(key as keyType, { message: value });
      }
    }
    if (response.errors) {
      form.reset();
      form.setError("root", { message: response.errors.root });
      form.setFocus("username");
    }
  });
  return (
    <>
      <Form {...form}>
        <form action={action} className="space-y-8">
          {form.formState.errors.root && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} tabIndex={1} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        tabIndex={4}
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>

                    <FormControl>
                      <Input type="password" tabIndex={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" tabIndex={3} className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
