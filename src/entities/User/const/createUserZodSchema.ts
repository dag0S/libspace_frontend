import { z } from "zod";

export const createUserFormSchema = z
  .object({
    firstName: z.string().min(2, "Имя должно быть длинее 2 символов"),
    lastName: z.string().min(2, "Фамилия должно быть длинее 2 символов"),
    email: z.string().email("Введите корректный email-адрес"),
    role: z.string({
      required_error: "Пожалуйста, выберите роль",
    }),
    password: z
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .max(64, "Пароль не должен превышавть 64 символа")
      .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
      .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
      .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
      .regex(
        /[~!?@#$%^&*_+\-()\[\]{}><\/\\|"',.:]/,
        "Пароль должен содержать хотя бы один спецсимвол (~!?@#$%^&*_+-()[]{}><\\/|\"',.:)"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });
