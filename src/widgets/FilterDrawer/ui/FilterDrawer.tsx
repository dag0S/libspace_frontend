"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  MultipleSelector,
  Option,
} from "@/src/shared/shadcn";
import { authorToOption, genreToOption } from "@/src/shared/utils";
import { useGetGenresQuery } from "@/src/entities/Genre";
import { useGetAuthorsQuery } from "@/src/entities/Author";

interface Props {
  className?: string;
  children: ReactNode;
}

export const FilterDrawer: FC<Props> = ({ children }) => {
  const { data: genres } = useGetGenresQuery();
  const { data: authors } = useGetAuthorsQuery();
  const [genresSelected, setGenresSelected] = useState<Option[]>([]);
  const [authorsSelected, setAuthorsSelected] = useState<Option[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const genreOptions = genres && genres.map(genreToOption);
  const authorOptions = authors && authors.map(authorToOption);

  useEffect(() => {
    if (!genreOptions || !authorOptions) return;

    const authorsParam = searchParams
      ?.get("authors")
      ?.split(",")
      .map((id) => authorOptions?.find((genre) => genre.value === id))
      .filter(Boolean) as Option[];
    const genresParam = searchParams
      ?.get("genres")
      ?.split(",")
      .map((id) => genreOptions?.find((genre) => genre.value === id))
      .filter(Boolean) as Option[];

    setGenresSelected(genresParam);
    setAuthorsSelected(authorsParam);
  }, [genres, authors]);

  const handleFilterByGenres = useDebouncedCallback((genres: Option[]) => {
    const params = new URLSearchParams(searchParams?.toString());

    if (genres) {
      params.set("genres", genres.map((genre) => genre.value).join(","));
    } else {
      params.delete("genres");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 1000);

  const handleFilterByAuthors = useDebouncedCallback((authors: Option[]) => {
    const params = new URLSearchParams(searchParams?.toString());

    if (authors) {
      params.set("authors", authors.map((author) => author.value).join(","));
    } else {
      params.delete("authors");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 1000);

  const handleSetGenres = (option: Option[]) => {
    setGenresSelected(option);
    handleFilterByGenres(option);
  };

  const handleSetAuthors = (option: Option[]) => {
    setAuthorsSelected(option);
    handleFilterByAuthors(option);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams?.toString());

    params.delete("genres");
    params.delete("authors");
    router.replace(`${pathname}?${params.toString()}`);

    setAuthorsSelected([]);
    setGenresSelected([]);
  };

  const noResultsFound = (
    <div className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
      Ничего не найдено
    </div>
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-5/6">
        <DrawerHeader>
          <div className="flex justify-between items-center gap-2">
            <DrawerTitle className="mb-2 text-xl">Фильтрация</DrawerTitle>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearFilters}
            >
              Сбросить
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <MultipleSelector
              maxSelected={3}
              onMaxSelected={(maxLimit) => {
                toast.error(
                  `Вы достигли максимального количества выбранных жанров: ${maxLimit}`
                );
              }}
              value={genresSelected}
              onChange={handleSetGenres}
              options={genreOptions}
              placeholder="Выберите жанры"
              emptyIndicator={noResultsFound}
            />
            <MultipleSelector
              onMaxSelected={(maxLimit) => {
                toast.error(
                  `Вы достигли максимального количества выбранных авторов: ${maxLimit}`
                );
              }}
              maxSelected={3}
              value={authorsSelected}
              onChange={handleSetAuthors}
              options={authorOptions}
              placeholder="Выберите авторов"
              emptyIndicator={noResultsFound}
            />
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
