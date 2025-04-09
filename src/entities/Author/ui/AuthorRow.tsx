import { FC } from "react";
import { Edit, Trash } from "lucide-react";

import { cn } from "@/src/shared/lib";
import { Button, TableCell, TableRow } from "@/src/shared/shadcn";
import { formatDateLocalized } from "@/src/shared/utils";
import { DashboardDrawer } from "@/src/shared/ui";
import { IAuthor } from "../types/types";
import { DeleteAuthor } from "@/src/features/DeleteAuthor";
import { EditAuthor } from "@/src/features/EditAuthor";

interface Props {
  className?: string;
  author: IAuthor;
}

export const AuthorRow: FC<Props> = ({ className, author }) => {
  return (
    <TableRow className={cn("", className)}>
      <TableCell>{author.name}</TableCell>
      <TableCell>{formatDateLocalized(author.createdAt.toString())}</TableCell>
      <TableCell>{formatDateLocalized(author.updatedAt.toString())}</TableCell>
      <TableCell className="sticky right-0 z-10 bg-background">
        <div className="flex gap-2 justify-end">
          <DashboardDrawer
            title="Редактирование автора"
            content={<EditAuthor author={author} />}
          >
            <Button size="icon" title="Редактировать автора">
              <Edit />
            </Button>
          </DashboardDrawer>
          <DashboardDrawer
            title="Удаление автора"
            content={<DeleteAuthor authorId={author.id} />}
          >
            <Button size="icon" variant="destructive" title="Удалить автора">
              <Trash />
            </Button>
          </DashboardDrawer>
        </div>
      </TableCell>
    </TableRow>
  );
};
