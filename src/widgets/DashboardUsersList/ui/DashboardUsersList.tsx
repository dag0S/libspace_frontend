"use client";

import { FC } from "react";

import { cn } from "@/src/shared/lib";
import { useGetUsersQuery, UserRow } from "@/src/entities/User";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/shadcn";
import { DashboardUsersListSkeleton } from "./DashboardUsersListSkeleton";

interface Props {
  className?: string;
}

export const DashboardUsersList: FC<Props> = ({ className }) => {
  const { data, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <DashboardUsersListSkeleton />;
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Фамилия</TableHead>
            <TableHead>Имя</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Роль</TableHead>
            <TableHead>Время создания</TableHead>
            <TableHead>Время обновления</TableHead>
            <TableHead className="sticky right-0 z-10 text-right bg-background">
              Действия
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.map((user) => <UserRow user={user} key={user.id} />)}
        </TableBody>
      </Table>
    </div>
  );
};
