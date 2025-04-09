import { z } from "zod";

export const createGenreFormSchema = z.object({
  name: z.string().min(2, "Название жанра должно быть длинее 2 символов"),
});
