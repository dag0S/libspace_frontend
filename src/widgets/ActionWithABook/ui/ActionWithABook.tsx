"use client";

import { FC } from "react";

import { cn } from "@/src/shared/lib";
import { useCheckBookStatusQuery } from "@/src/entities/Borrowing";
import { useAppSelector } from "@/src/shared/hooks";
import { Button, Spinner } from "@/src/shared/shadcn";
import { ReturnBook } from "@/src/features/ReturnBook";
import { BorrowABook } from "@/src/features/BorrowABook";

interface Props {
  className?: string;
  bookId: string;
  copies: number;
}

export const ActionWithABook: FC<Props> = ({ className, bookId, copies }) => {
  const { user } = useAppSelector((state) => state.authUser);
  const { data, isLoading: isLoadingHasBorrowed } = useCheckBookStatusQuery(
    {
      bookId,
      userId: user?.id,
    },
    { skip: !user?.id }
  );

  if (isLoadingHasBorrowed) {
    <Button>
      <Spinner />
    </Button>;
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {data?.hasBorrowed && data.borrowingId ? (
        <ReturnBook borrowingId={data.borrowingId} />
      ) : (
        <BorrowABook bookId={bookId} copies={copies} />
      )}
    </div>
  );
};
