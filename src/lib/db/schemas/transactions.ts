import { pgTable, integer, timestamp, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from './users';
import { accountsTable } from './accounts';
import { categoriesTable } from './categories';

export const transactionsTable = pgTable('transactions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  accountId: integer()
    .notNull()
    .references(() => accountsTable.id),
  categoryId: integer()
    .notNull()
    .references(() => categoriesTable.id),
  amount: integer().notNull(),
  description: varchar({ length: 255 }).notNull(),
  date: timestamp('date', { withTimezone: true, mode: 'date' }).notNull(),
});
