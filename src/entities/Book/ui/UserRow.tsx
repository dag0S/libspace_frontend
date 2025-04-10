import { FC } from "react";
import { Edit, Eye, Trash } from "lucide-react";

import { cn } from "@/src/shared/lib";
import { Badge, Button, TableCell, TableRow } from "@/src/shared/shadcn";
import { formatDateLocalized } from "@/src/shared/utils";
import { IBookWithGenresAndAuthor } from "../types/types";
import { DashboardDrawer } from "@/src/shared/ui";
import Link from "next/link";
import { MENU_LIST } from "@/src/shared/constant";
import { EditBook } from "@/src/features/EditBook";
import { DeleteBook } from "@/src/features/DeleteBook";

interface Props {
  className?: string;
  book: IBookWithGenresAndAuthor;
}

export const BookRow: FC<Props> = ({ className, book }) => {
  return (
    <TableRow className={cn("", className)}>
      <TableCell className="min-w-[300px] whitespace-normal">
        {book.title}
      </TableCell>
      <TableCell className="min-w-[500px] whitespace-normal">
        {book.description}
      </TableCell>
      <TableCell>{book.copies}</TableCell>
      <TableCell>{book.bookCoverURL ? "Есть" : "Нет"}</TableCell>
      <TableCell>{book.author.name}</TableCell>
      <TableCell className="flex flex-wrap gap-2">
        {book.genres.map((genre) => (
          <Badge variant="outline" key={genre.id}>
            {genre.name}
          </Badge>
        ))}
      </TableCell>
      <TableCell>{formatDateLocalized(book.createdAt.toString())}</TableCell>
      <TableCell>{formatDateLocalized(book.updatedAt.toString())}</TableCell>
      <TableCell className="sticky right-0 z-10 bg-background">
        <div className="flex flex-col gap-2 justify-end items-center lg:flex-row">
          <Link href={`${MENU_LIST.book}/${book.id}`}>
            <Button size="icon" title="Просмотр книги">
              <Eye />
            </Button>
          </Link>
          <DashboardDrawer
            title="Редактирование книги"
            content={<EditBook book={book} />}
          >
            <Button size="icon" title="Редактировать книгу">
              <Edit />
            </Button>
          </DashboardDrawer>
          <DashboardDrawer
            title="Удаление книги"
            content={<DeleteBook bookId={book.id} />}
          >
            <Button size="icon" variant="destructive" title="Удалить книгу">
              <Trash />
            </Button>
          </DashboardDrawer>
        </div>
      </TableCell>
    </TableRow>
  );
};
