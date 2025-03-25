import { IBook } from "@/src/entities/Book";

export const fetchBooks = async (): Promise<IBook[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Ошибка при загрузке книг");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw new Error("Не удалось получить книги");
  }
};
