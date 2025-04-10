import { z } from "zod";
import { createBookFormSchema } from "../const/BookZodSchemes";

export interface IBook {
  id: string;
  title: string;
  description: string;
  bookCoverURL: string | null;
  authorId: string;
  copies: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookWithGenresAndAuthor {
  id: string;
  title: string;
  description: string;
  bookCoverURL: string | null;
  authorId: string;
  copies: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
  };
  genres: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    bookId: string | null;
  }[];
}

export type BookCreationData = z.infer<typeof createBookFormSchema>;
