'use server'

import { db } from '@/lib/db'
import { usersTable } from '@/lib/db/schema'
import { registerSchema } from '@/lib/validation/auth'
import { genSalt, hash } from 'bcrypt-ts'
import { eq } from 'drizzle-orm'

export async function registerAction(formData: FormData) {
  const rawData = Object.fromEntries(formData)

  const validationResult = registerSchema.safeParse(rawData)
  if (!validationResult.success) {
    return {
      error: validationResult.error.flatten().fieldErrors,
    }
  }

  const { email, name, password } = validationResult.data

  try {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1)

    if (existingUser.length > 0) {
      return {
        error: 'Пользователь уже существует',
      }
    }

    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

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
      })

    return {
      error: false,
      user: newUser,
    }
  } catch (e) {
    console.error('Ошибка при регистрации:', e)
    return {
      error: 'Произошла ошибка при регистрации. Попробуйте еще раз.',
    }
  }
}

export async function loginAction(formData: FormData) {}

export async function logoutAction(formData: FormData) {}
