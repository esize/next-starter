import { pgTable, text } from "drizzle-orm/pg-core";

const users = pgTable("user", {
  id: text("id").primaryKey(),
});

export default users;
