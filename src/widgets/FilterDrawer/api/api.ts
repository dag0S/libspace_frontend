import { IAuthor } from "@/src/entities/Author";
import { IGenre } from "@/src/entities/Genre";

export const fetchGenres = async (): Promise<IGenre[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/genres`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Ошибка при загрузке жанров");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw new Error("Не удалось получить жанры");
  }
};

export const fetchAuthors = async (): Promise<IAuthor[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Ошибка при загрузке авторов");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw new Error("Не удалось получить авторов");
  }
};
