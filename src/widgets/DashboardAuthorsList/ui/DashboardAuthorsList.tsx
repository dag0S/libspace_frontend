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
import { AuthorRow, useGetAuthorsQuery } from "@/src/entities/Author";

interface Props {
  className?: string;
}

export const DashboardAuthorsList: FC<Props> = ({ className }) => {
  const { data, isLoading } = useGetAuthorsQuery();

  if (isLoading) {
    return <DashboardListSkeleton />;
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Наименование</TableHead>
            <TableHead>Время создания</TableHead>
            <TableHead>Время обновления</TableHead>
            <TableHead className="sticky right-0 z-10 text-right bg-background w-[100px]">
              Действия
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((author) => <AuthorRow author={author} key={author.id} />)}
        </TableBody>
      </Table>
    </div>
  );
};
