import { FC } from "react";
import { Edit, Trash } from "lucide-react";

import { cn } from "@/src/shared/lib";
import { Button, TableCell, TableRow } from "@/src/shared/shadcn";
import { formatDateLocalized, getRoleName } from "@/src/shared/utils";
import { IUser } from "../types/types";
import { DashboardDrawer } from "@/src/shared/ui";
import { EditUser } from "@/src/features/EditUser";
import { DeleteUser } from "@/src/features/DeleteUser";

interface Props {
  className?: string;
  user: IUser;
}

export const UserRow: FC<Props> = ({ className, user }) => {
  return (
    <TableRow className={cn("", className)}>
      <TableCell>{user.lastName}</TableCell>
      <TableCell>{user.firstName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{getRoleName(user.role)}</TableCell>
      <TableCell>{formatDateLocalized(user.createdAt.toString())}</TableCell>
      <TableCell>{formatDateLocalized(user.updatedAt.toString())}</TableCell>
      <TableCell className="sticky right-0 z-10 bg-background">
        <div className="flex gap-2 justify-end">
          <DashboardDrawer
            title="Редактирование пользователя"
            content={<EditUser user={user} />}
          >
            <Button size="icon" title="Редактировать пользователя">
              <Edit />
            </Button>
          </DashboardDrawer>
          <DashboardDrawer
            title="Удаление пользователя"
            content={<DeleteUser userId={user.id} />}
          >
            <Button
              size="icon"
              variant="destructive"
              title="Удалить пользователя"
            >
              <Trash />
            </Button>
          </DashboardDrawer>
        </div>
      </TableCell>
    </TableRow>
  );
};
