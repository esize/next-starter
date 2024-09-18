import { createEnv } from "@t3-oss/env-nextjs";
import { ZodError, z } from "zod";

export const env = createEnv({
  // Declare our server-side environment variables
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },

  // Declare our server-side environment variables
  client: {},

  // Declare our client-side environment variables from process.env
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
  // Called when the schema validation fails.
  onValidationError: (error: ZodError) => {
    console.error("\n❌ Invalid environment variables:");
    console.error(error.flatten().fieldErrors, "\n\n\n");
    process.exit(1);
  },
});
