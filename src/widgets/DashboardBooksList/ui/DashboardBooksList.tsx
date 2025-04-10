"use client";

import { FC } from "react";

import { cn } from "@/src/shared/lib";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/shadcn";
import { DashboardListSkeleton } from "@/src/shared/ui";
import { BookRow, useGetBooksFullInfoQuery } from "@/src/entities/Book";

interface Props {
  className?: string;
}

export const DashboardBooksList: FC<Props> = ({ className }) => {
  const { data, isLoading } = useGetBooksFullInfoQuery();

  if (isLoading) {
    return <DashboardListSkeleton />;
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Копии</TableHead>
            <TableHead>Обложка</TableHead>
            <TableHead>Автор</TableHead>
            <TableHead>Жанры</TableHead>
            <TableHead>Время создания</TableHead>
            <TableHead>Время обновления</TableHead>
            <TableHead className="sticky right-0 z-10 text-right bg-background w-[100px]">
              Действия
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.map((book) => <BookRow key={book.id} book={book} />)}
        </TableBody>
      </Table>
    </div>
  );
};
