import { z } from "zod";
import { createAuthorFormSchema } from "../const/AuthorZodSchemes";

export interface IAuthor {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AuthorCreationData = z.infer<typeof createAuthorFormSchema>;