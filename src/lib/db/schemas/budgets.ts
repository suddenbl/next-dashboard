import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from './users';
import { categoriesTable } from './categories';

export const budgetsTable = pgTable('budgets', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  categoryId: integer()
    .notNull()
    .references(() => categoriesTable.id),
  amount: integer().notNull(),
  period: varchar({ length: 50 }).notNull(),
  startDate: timestamp('start_date', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
  endDate: timestamp('end_date', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});
