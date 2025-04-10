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
import { LogRow, useGetLogsByIdQuery } from "@/src/entities/Log";
import { MENU_LIST } from "@/src/shared/constant";

interface Props {
  className?: string;
}

export const DashboardUserLogList: FC<Props> = ({ className }) => {
  const params = useParams<{ userId: string }>();
  const router = useRouter();
  const { data, isLoading } = useGetLogsByIdQuery(params?.userId || "");

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
            <TableHead>HTTP метод</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Время</TableHead>
            <TableHead className="sticky right-0 z-10 text-right bg-background w-[100px]">
              Действия
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.map((log) => <LogRow log={log} key={log.id} />)}
        </TableBody>
      </Table>
    </div>
  );
};
