"use client";

import { FC, useState } from "react";
import toast from "react-hot-toast";

import { cn } from "@/src/shared/lib";
import { Button } from "@/src/shared/shadcn";
import { isErrorWithMessage } from "@/src/shared/utils";
import { useDeleteBookMutation } from "@/src/entities/Book";

interface Props {
  className?: string;
  bookId: string;
}

export const DeleteBook: FC<Props> = ({ className, bookId }) => {
  const [deleteBook, { isLoading }] = useDeleteBookMutation();
  const [error, setError] = useState("");

  const handleDeleteUser = async () => {
    try {
      setError("");

      if (!isLoading) {
        await deleteBook(bookId).unwrap();
      }

      toast.success("Вы успешно удалили книгу");
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);

      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }

      toast.error("Не удалось удалить книгу");
    }
  };

  return (
    <div className={cn("w-full flex flex-col gap-6 mb-2", className)}>
      <div>
        Это действие нельзя отменить. Это приведет к необратимому удалению всех
        данных о книге.
      </div>
      <Button onClick={handleDeleteUser} variant="destructive">
        Удалить книгу
      </Button>
      {error && <div className="text-destructive">{error}</div>}
    </div>
  );
};
