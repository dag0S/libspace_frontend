import { IBookWithGenresAndAuthor } from "../types/types";

export const fetchBookById = async (
  bookId: string
): Promise<IBookWithGenresAndAuthor> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`,
      {
        cache: "force-cache",
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Ошибка при загрузке книги");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw new Error("Не удалось получить книги");
  }
};
