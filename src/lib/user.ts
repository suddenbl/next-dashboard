import { cookies } from 'next/headers';
import { verifySession } from './session';
import { db } from './db';
import { usersTable } from './db/schemas/users';
import { eq } from 'drizzle-orm';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  const session = await verifySession(token);
  if (!session?.userId) return null;

  const [user] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      createdAt: usersTable.createdAt,
      updatedAt: usersTable.updatedAt,
    })
    .from(usersTable)
    .where(eq(usersTable.id, session.userId))
    .limit(1);

  return user || null;
}
