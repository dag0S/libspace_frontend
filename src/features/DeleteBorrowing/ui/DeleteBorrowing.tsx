"use client";

import { FC, useState } from "react";
import toast from "react-hot-toast";

import { cn } from "@/src/shared/lib";
import { Button } from "@/src/shared/shadcn";
import { isErrorWithMessage } from "@/src/shared/utils";
import { useRemoveBorrowingMutation } from "@/src/entities/Borrowing";

interface Props {
  className?: string;
  borrowingId: string;
}

export const DeleteBorrowing: FC<Props> = ({ className, borrowingId }) => {
  const [deleteBorrowing, { isLoading }] = useRemoveBorrowingMutation();
  const [error, setError] = useState("");

  const handleDeleteGenre = async () => {
    try {
      setError("");

      if (!isLoading) {
        await deleteBorrowing(borrowingId).unwrap();
      }

      toast.success("Вы успешно удалили аренду книги пользователя");
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);

      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }

      toast.error("Не удалось удалить аренду книги пользователя");
    }
  };

  return (
    <div className={cn("w-full flex flex-col gap-6 mb-2", className)}>
      <div>
        Это действие нельзя отменить. Это приведет к необратимому удалению
        аренды конкретной книги пользователя.
      </div>
      <Button onClick={handleDeleteGenre} variant="destructive">
        Удалить аренду книги пользователя
      </Button>
      {error && <div className="text-destructive">{error}</div>}
    </div>
  );
};
