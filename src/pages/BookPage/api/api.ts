import { IBookWithGenresAndAuthor } from "@/src/entities/Book";

export const fetchBookById = async (
  bookId: string
): Promise<IBookWithGenresAndAuthor | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 200,
      },
    }
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Ошибка при загрузке книги");
  }

  return await res.json();
};
