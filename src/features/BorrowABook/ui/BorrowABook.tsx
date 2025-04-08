"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { cn } from "@/src/shared/lib";
import { Button } from "@/src/shared/shadcn";
import { useAppSelector } from "@/src/shared/hooks";
import { useBorrowABookMutation } from "@/src/entities/Borrowing";
import { isErrorWithMessage } from "@/src/shared/utils";
import { MENU_LIST } from "@/src/shared/constant";

interface Props {
  className?: string;
  bookId: string;
  copies: number;
}

export const BorrowABook: FC<Props> = ({ className, bookId, copies }) => {
  const { user } = useAppSelector((state) => state.authUser);
  const [borrowABook, { isLoading }] = useBorrowABookMutation();
  const [error, setError] = useState("");
  const router = useRouter();

  const handleBorrowABook = async () => {
    try {
      setError("");

      if (!isLoading && user) {
        await borrowABook({ userId: user.id, bookId }).unwrap();
      }

      router.push(MENU_LIST.borrowings);

      toast.success("Вы успешно взяли книгу в аренду");
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);

      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }

      toast.error("Не удалось взять книгу в аренду");
    }
  };

  if (!user) {
    return (
      <h2 className="text-xl p-2 border border-primary rounded-lg">
        Чтобы взять книгу в аренду, нужно быть авторизированным.{" "}
        <Link href={MENU_LIST.login} className="text-primary">
          Войти в свой аккаунт
        </Link>
      </h2>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {error && <div className="text-destructive">{error}</div>}
      <Button
        size="lg"
        disabled={copies <= 0}
        loading={isLoading}
        onClick={handleBorrowABook}
      >
        Взять в аренду
      </Button>
    </div>
  );
};
