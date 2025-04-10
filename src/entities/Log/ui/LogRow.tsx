import { FC } from "react";
import { Trash } from "lucide-react";

import { cn } from "@/src/shared/lib";
import { Button, TableCell, TableRow } from "@/src/shared/shadcn";
import { formatDateLocalized } from "@/src/shared/utils";
import { DashboardDrawer } from "@/src/shared/ui";
import { ILog } from "../types/types";
import { DeleteLog } from "@/src/features/DeleteLog";

interface Props {
  className?: string;
  log: ILog;
}

export const LogRow: FC<Props> = ({ className, log }) => {
  return (
    <TableRow className={cn("", className)}>
      <TableCell
        className={cn({
          "text-green-500": log.methodHTTP === "GET",
          "text-red-500": log.methodHTTP === "DELETE",
          "text-yellow-500": log.methodHTTP === "POST",
          "text-orange-500": log.methodHTTP === "PUT",
        })}
      >
        {log.methodHTTP}
      </TableCell>
      <TableCell>{log.action}</TableCell>
      <TableCell>{formatDateLocalized(log.createdAt.toString())}</TableCell>
      <TableCell className="sticky right-0 z-10 bg-background">
        <div className="flex gap-2 justify-end">
          <DashboardDrawer
            title="Удаление лога"
            content={<DeleteLog logId={log.id} />}
          >
            <Button size="icon" variant="destructive" title="Удалить лог">
              <Trash />
            </Button>
          </DashboardDrawer>
        </div>
      </TableCell>
    </TableRow>
  );
};
