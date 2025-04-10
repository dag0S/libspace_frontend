import { FC } from "react";
import { Edit, ScrollText, Ticket, Trash } from "lucide-react";

import { cn } from "@/src/shared/lib";
import { Button, TableCell, TableRow } from "@/src/shared/shadcn";
import { formatDateLocalized, getRoleName } from "@/src/shared/utils";
import { IUser } from "../types/types";
import { DashboardDrawer } from "@/src/shared/ui";
import { EditUser } from "@/src/features/EditUser";
import { DeleteUser } from "@/src/features/DeleteUser";
import Link from "next/link";
import { MENU_LIST } from "@/src/shared/constant";

interface Props {
  className?: string;
  hasLog: boolean;
  hasBorrowing: boolean;
  hasEditAndDelete: boolean;
  user: IUser;
}

export const UserRow: FC<Props> = ({
  className,
  user,
  hasEditAndDelete,
  hasLog,
  hasBorrowing,
}) => {
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
          {hasBorrowing && (
            <Link href={`${MENU_LIST.dashboard_borrowings}/${user.id}`}>
              <Button size="icon" title="Промотреть книги, взятые в аренду">
                <Ticket />
              </Button>
            </Link>
          )}
          {hasLog && (
            <Link href={`${MENU_LIST.dashboard_logs}/${user.id}`}>
              <Button size="icon" title="Промотреть логи пользователя">
                <ScrollText />
              </Button>
            </Link>
          )}
          {hasEditAndDelete && (
            <>
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
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};
