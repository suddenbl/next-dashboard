import z from 'zod'

export const loginSchema = z.object({
  email: z.email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
})

export const registerSchema = z
  .object({
    email: z.email(),
    name: z.string().min(2, 'Имя должно быть не менее 2 символов'),
    password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
    passwordConfirm: z
      .string()
      .min(6, 'Пароль должен быть не менее 6 символов'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        message: 'Пароли не совпадают',
        path: ['passwordConfirm'],
      })
    }
  })
