'use server';

import { redirect } from 'next/navigation';
import { compare, hash } from 'bcrypt-ts';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { usersTable } from '@/lib/db/schema';
import { createSession, deleteSession } from '@/lib/session';
import { loginSchema, registerSchema } from '@/lib/validation/auth';

export async function registerAction(prevState: unknown, formData: FormData) {
  const rawData = Object.fromEntries(formData);

  const result = registerSchema.safeParse(rawData);
  if (!result.success) {
    return {
      error: result.error.issues[0]?.message || 'Ошибка валидации',
      fields: {
        name: rawData.name as string,
        email: rawData.email as string,
      },
    };
  }

  const { email, name, password } = result.data;

  try {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return {
        error: 'Пользователь уже существует',
      };
    }

    const hashedPassword = await hash(password, 10);

    const [newUser] = await db
      .insert(usersTable)
      .values({
        email,
        name,
        password: hashedPassword,
      })
      .returning({
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name,
      });

    await createSession(newUser.id);
  } catch (e) {
    console.error('Ошибка при регистрации:', e);
    return {
      error: 'Произошла ошибка при регистрации. Попробуйте еще раз.',
    };
  }

  redirect('/dashboard');
}

export async function loginAction(prevState: unknown, formData: FormData) {
  const rawData = Object.fromEntries(formData);

  const result = loginSchema.safeParse(rawData);
  if (!result.success) {
    return {
      error: result.error.issues[0]?.message || 'Ошибка валидации',
      fields: {
        email: rawData.email as string,
      },
    };
  }

  const { email, password } = result.data;

  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (!user) {
      return {
        error: 'Неверный email или пароль',
      };
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return {
        error: 'Неверный email или пароль',
      };
    }

    await createSession(user.id);
  } catch (e) {
    console.error('Ошибка при входе:', e);
    return {
      error: 'Произошла ошибка при входе. Попробуйте еще раз.',
    };
  }

  redirect('/dashboard');
}

export async function logoutAction() {
  await deleteSession();
  redirect('/login');
}
