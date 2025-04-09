import { FC } from "react";
import { Edit, Trash } from "lucide-react";

import { cn } from "@/src/shared/lib";
import { Button, TableCell, TableRow } from "@/src/shared/shadcn";
import { formatDateLocalized } from "@/src/shared/utils";
import { DashboardDrawer } from "@/src/shared/ui";
import { IGenre } from "../types/types";
import { EditGenre } from "@/src/features/EditGenre";
import { DeleteGenre } from "@/src/features/DeleteGenre";

interface Props {
  className?: string;
  genre: IGenre;
}

export const GenreRow: FC<Props> = ({ className, genre }) => {
  return (
    <TableRow className={cn("", className)}>
      <TableCell>{genre.name}</TableCell>
      <TableCell>{formatDateLocalized(genre.createdAt.toString())}</TableCell>
      <TableCell>{formatDateLocalized(genre.updatedAt.toString())}</TableCell>
      <TableCell className="sticky right-0 z-10 bg-background">
        <div className="flex gap-2 justify-end">
          <DashboardDrawer
            title="Редактирование жанра"
            content={<EditGenre genre={genre} />}
          >
            <Button size="icon" title="Редактировать жанр">
              <Edit />
            </Button>
          </DashboardDrawer>
          <DashboardDrawer
            title="Удаление жанра"
            content={<DeleteGenre genreId={genre.id} />}
          >
            <Button size="icon" variant="destructive" title="Удалить жанр">
              <Trash />
            </Button>
          </DashboardDrawer>
        </div>
      </TableCell>
    </TableRow>
  );
};
