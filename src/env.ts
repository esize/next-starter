import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  // Declare our server-side environment variables
  server: {
    DATABASE_URL: z.string().url(),
    OPEN_AI_API_KEY: z.string().min(1),
  },

  // Declare our server-side environment variables
  client: {
    NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
  },

  // Declare our client-side environment variables from process.env
  experimental__runtimeEnv: {
    NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  },
});
