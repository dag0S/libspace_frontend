import { z } from "zod";

import { createGenreFormSchema } from "../const/GenreZodSchemes";

export interface IGenre {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  bookId: string | null;
}

export type GenreCreationData = z.infer<typeof createGenreFormSchema>;
