"use client";

import { FC, ReactNode } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  MultipleSelector,
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

  const genreOptions = genres && genres.map(genreToOption);
  const authorOptions = authors && authors.map(authorToOption);

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
          <DrawerTitle className="mb-2 text-xl">Фильтрация</DrawerTitle>
          <div className="flex flex-col gap-2">
            <MultipleSelector
              options={genreOptions}
              placeholder="Выберите жанры"
              emptyIndicator={noResultsFound}
            />
            <MultipleSelector
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
