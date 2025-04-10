import { z } from "zod";

export const createBookFormSchema = z.object({
  title: z.string().min(2, "Название книги должно быть длинее 2 символов"),
  description: z
    .string()
    .min(10, "Описание книги должно быть длинее 10 символов"),
  copies: z.coerce.number().gte(0, "Число копий книги должно быть больше 0"),
  authorId: z.string({ message: "Обязательное поле" }),
});

