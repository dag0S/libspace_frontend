"use client";

import { FC } from "react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/src/shared/lib";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/shadcn";
import { DashboardListSkeleton } from "@/src/shared/ui";
import { MENU_LIST } from "@/src/shared/constant";
import {
  BorrowingRow,
  useGetBorrowingsByUserIdQuery,
} from "@/src/entities/Borrowing";

interface Props {
  className?: string;
}

export const DashboardUserBorrowingsList: FC<Props> = ({ className }) => {
  const params = useParams<{ userId: string }>();
  const router = useRouter();
  const { data, isLoading } = useGetBorrowingsByUserIdQuery(
    params?.userId || ""
  );

  if (isLoading) {
    return <DashboardListSkeleton />;
  }

  if (!data) {
    router.push(MENU_LIST.not_found);
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название книги</TableHead>
            <TableHead>Время взятия в аренду</TableHead>
            <TableHead>Крайний срок сдачи книги</TableHead>
            <TableHead>Время фактической сдачи книги</TableHead>
            <TableHead className="sticky right-0 z-10 text-right bg-background w-[100px]">
              Действия
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((borrowing) => (
              <BorrowingRow borrowing={borrowing} key={borrowing.id} />
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
