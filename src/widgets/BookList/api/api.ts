import { IBook } from "@/src/entities/Book";
import { BooksQueryParams } from "../types/types";

export const fetchBooks = async (
  queryParams: BooksQueryParams
): Promise<IBook[]> => {
  try {
    const { searchBy, sortBy, authors, genres } = queryParams;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books?searchBy=${searchBy}&sortBy=${sortBy}&authors=${authors}&genres=${genres}`
    );

    if (!res.ok) {
      throw new Error("Ошибка при загрузке книг");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw new Error("Не удалось получить книги");
  }
};
