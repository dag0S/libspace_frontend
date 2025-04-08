"use client";

import { FC } from "react";

import { cn } from "@/src/shared/lib";
import {
  Borrowing,
  useGetBorrowingsByUserIdQuery,
} from "@/src/entities/Borrowing";
import { ResponseUserDate } from "@/src/features/Auth";
import { UserBorrowingsListSkeleton } from "./UserBorrowingsListSkeleton";

interface Props {
  className?: string;
  user: ResponseUserDate;
}

export const UserBorrowingsList: FC<Props> = ({ className, user }) => {
  const { data, isLoading } = useGetBorrowingsByUserIdQuery(user.id);

  if (isLoading) {
    return <UserBorrowingsListSkeleton />;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-5",
        className
      )}
    >
      {data && data.length > 0 ? (
        data?.map((borrowing) => (
          <Borrowing borrowing={borrowing} key={borrowing.id} />
        ))
      ) : (
        <div className="text-xl">У вас нет книг в аренде</div>
      )}
    </div>
  );
};
