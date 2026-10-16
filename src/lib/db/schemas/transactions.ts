import { pgTable, integer, timestamp, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from './users';
import { accountsTable } from './accounts';
import { categoriesTable } from './categories';

export const transactionsTable = pgTable('transactions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id),
  accountId: integer('account_id')
    .notNull()
    .references(() => accountsTable.id),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categoriesTable.id),
  amount: integer().notNull(),
  description: varchar({ length: 255 }).notNull(),
  date: timestamp('date', { withTimezone: true, mode: 'date' }).notNull(),
});
