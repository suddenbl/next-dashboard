import { defineRelations } from 'drizzle-orm';
import { accountsTable } from './schemas/accounts';
import { budgetsTable } from './schemas/budgets';
import { categoriesTable } from './schemas/categories';
import { transactionsTable } from './schemas/transactions';
import { usersTable } from './schemas/users';

export const relations = defineRelations(
  {
    users: usersTable,
    accounts: accountsTable,
    budgets: budgetsTable,
    transactions: transactionsTable,
    categories: categoriesTable,
  },
  (r) => ({
    users: {
      accounts: r.many.accounts(),
      categories: r.many.categories(),
      transactions: r.many.transactions(),
      budgets: r.many.budgets(),
    },
    accounts: {
      user: r.one.users({
        from: r.accounts.userId,
        to: r.users.id,
      }),
      transactions: r.many.transactions(),
    },
    categories: {
      user: r.one.users({
        from: r.categories.userId,
        to: r.users.id,
      }),
      transactions: r.many.transactions(),
      budgets: r.many.budgets(),
    },
    transactions: {
      user: r.one.users({
        from: r.transactions.userId,
        to: r.users.id,
      }),
      account: r.one.accounts({
        from: r.transactions.accountId,
        to: r.accounts.id,
      }),
      category: r.one.categories({
        from: r.transactions.categoryId,
        to: r.categories.id,
      }),
    },
    budgets: {
      user: r.one.users({
        from: r.budgets.userId,
        to: r.users.id,
      }),
      category: r.one.categories({
        from: r.budgets.categoryId,
        to: r.categories.id,
      }),
    },
  }),
);
