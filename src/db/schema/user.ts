import { pgTable, text } from "drizzle-orm/pg-core";

const users = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  password_hash: text("password_hash").notNull(),
});

export default users;
