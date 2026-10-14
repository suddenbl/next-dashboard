import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from './users';

export const categoriesTable = pgTable('categories', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  name: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 50 }).notNull(),
  color: varchar({ length: 7 }).notNull(),
});
