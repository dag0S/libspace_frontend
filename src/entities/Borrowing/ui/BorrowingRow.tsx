import { FC } from "react";
import { Eye, Trash } from "lucide-react";
import Link from "next/link";

import { cn } from "@/src/shared/lib";
import { Button, TableCell, TableRow } from "@/src/shared/shadcn";
import { formatDateLocalized } from "@/src/shared/utils";
import { IBorrowing } from "../types/types";
import { DashboardDrawer } from "@/src/shared/ui";
import { MENU_LIST } from "@/src/shared/constant";
import { DeleteBorrowing } from "@/src/features/DeleteBorrowing";

interface Props {
  className?: string;
  borrowing: IBorrowing;
}

export const BorrowingRow: FC<Props> = ({ className, borrowing }) => {
  return (
    <TableRow className={cn("", className)}>
      <TableCell>{borrowing.book.title}</TableCell>
      <TableCell>
        {formatDateLocalized(borrowing.borrowedAt.toString())}
      </TableCell>
      <TableCell>{formatDateLocalized(borrowing.dueDate.toString())}</TableCell>
      <TableCell>
        {borrowing.returnedAt === null
          ? "У читателя"
          : formatDateLocalized(borrowing.returnedAt.toString())}
      </TableCell>
      <TableCell className="sticky right-0 z-10 bg-background">
        <div className="flex gap-2 justify-end">
          <Link href={`${MENU_LIST.book}/${borrowing.book.id}`}>
            <Button size="icon" title="Промотреть книгу, взятую в аренду">
              <Eye />
            </Button>
          </Link>
          <DashboardDrawer
            title="Удаление аренды"
            content={<DeleteBorrowing borrowingId={borrowing.id} />}
          >
            <Button size="icon" variant="destructive" title="Удалить аренду">
              <Trash />
            </Button>
          </DashboardDrawer>
        </div>
      </TableCell>
    </TableRow>
  );
};
