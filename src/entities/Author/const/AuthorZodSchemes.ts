import { z } from "zod";

export const createAuthorFormSchema = z.object({
  name: z.string().min(2, "Наименование автора должно быть длинее 2 символов"),
});
