import { FC } from "react";
import Image from "next/image";

import { cn } from "@/src/shared/lib";
import { IBorrowing } from "../types/types";
import { Badge } from "@/src/shared/shadcn";
import { differenceInDays, formatDateLocalized } from "@/src/shared/utils";
import { ReturnBook } from "@/src/features/ReturnBook";
import Link from "next/link";
import { MENU_LIST } from "@/src/shared/constant";

interface Props {
  className?: string;
  borrowing: IBorrowing;
}

export const Borrowing: FC<Props> = ({ className, borrowing }) => {
  return (
    <div
      key={borrowing.id}
      className={cn("flex flex-col justify-between gap-2 relative", className)}
    >
      <div className="flex gap-2 relative">
        <Link
          href={`${MENU_LIST.book}/${borrowing.bookId}`}
          className="relative"
        >
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
            )}{" "}
            дней
          </Badge>
        </Link>
        <div className="flex flex-col gap-2 w-full">
          <div className="font-medium">{borrowing.book.title}</div>
          <div>
            <div className="text-sm">Дата взятия в аренду:</div>
            <div>{formatDateLocalized(borrowing.borrowedAt.toString())}</div>
          </div>
          <div>
            <div className="text-sm">Дата, до которой необходимо вернуть:</div>
            <div>{formatDateLocalized(borrowing.dueDate.toString())}</div>
          </div>
        </div>
      </div>
      <ReturnBook borrowingId={borrowing.id} />
    </div>
  );
};
