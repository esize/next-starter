import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "@/db/schema";

const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export default sessions;
