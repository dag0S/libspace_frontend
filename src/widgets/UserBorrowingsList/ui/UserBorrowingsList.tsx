"use client";

import { FC } from "react";
import Image from "next/image";

import { cn } from "@/src/shared/lib";
import { useGetBorrowingsByUserIdQuery } from "@/src/entities/Borrowing";
import { ResponseUserDate } from "@/src/features/Auth";
import { Badge, Button } from "@/src/shared/shadcn";
import { differenceInDays, formatDateLocalized } from "@/src/shared/utils";

interface Props {
  className?: string;
  user: ResponseUserDate;
}

export const UserBorrowingsList: FC<Props> = ({ className, user }) => {
  const { data, isLoading } = useGetBorrowingsByUserIdQuery(user.id);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4",
        className
      )}
    >
      {data?.map((borrowing) => (
        <div key={borrowing.id} className="flex gap-2 relative">
          <div className="relative">
            {borrowing.book.bookCoverURL ? (
              <div className="bg-muted rounded-md overflow-hidden flex items-center min-w-[100px] min-h-[150px]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGES_API_URL}${borrowing.book.bookCoverURL}`}
                  alt={borrowing.book.title}
                  width={100}
                  height={150}
                />
              </div>
            ) : (
              <div>Без обложки</div>
            )}
            <Badge variant="destructive" className="absolute top-2 left-2">
              {differenceInDays(
                borrowing.dueDate.toString(),
                borrowing.borrowedAt.toString()
              )}
            </Badge>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="font-medium">{borrowing.book.title}</div>
            <div>
              <div className="text-sm">Дата взятия в аренду:</div>
              <div>{formatDateLocalized(borrowing.borrowedAt.toString())}</div>
            </div>
            <div>
              <div className="text-sm">
                Дата, до которой необходимо вернуть:
              </div>
              <div>{formatDateLocalized(borrowing.dueDate.toString())}</div>
            </div>
            <Button>Вернуть книгу</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
