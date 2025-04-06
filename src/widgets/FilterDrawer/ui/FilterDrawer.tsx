"use client";

import { FC, ReactNode, useEffect, useState } from "react";

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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
    const params = new URLSearchParams(searchParams?.toString());

    params.set("genres", genresSelected.map((genre) => genre.value).join(","));
    params.set(
      "authors",
      authorsSelected.map((author) => author.value).join(",")
    );

    router.replace(`${pathname}?${params.toString()}`);
  }, [authorsSelected, genresSelected, pathname, router, searchParams]);

  const handleClearFilters = () => {
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
      <DrawerContent className="h-1/2">
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
              value={genresSelected}
              onChange={setGenresSelected}
              options={genreOptions}
              placeholder="Выберите жанры"
              emptyIndicator={noResultsFound}
            />
            <MultipleSelector
              value={authorsSelected}
              onChange={setAuthorsSelected}
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
