import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";

import db from "@/db";
import { sessions, users } from "@/db/schema";
import { env } from "@/env";

import { SessionProvider, useSession } from "./session-context";
import { validateRequest } from "./validate-request";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      username: attributes.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
}

export { lucia, SessionProvider, useSession, validateRequest };
