"use client";

import { FC, useState } from "react";
import toast from "react-hot-toast";

import { cn } from "@/src/shared/lib";
import { Button } from "@/src/shared/shadcn";
import { useReturnBookMutation } from "@/src/entities/Borrowing";
import { isErrorWithMessage } from "@/src/shared/utils";

interface Props {
  className?: string;
  borrowingId: string;
}

export const ReturnBook: FC<Props> = ({ className, borrowingId }) => {
  const [returnBook, { isLoading }] = useReturnBookMutation();
  const [error, setError] = useState("");

  const handleReturnBook = async () => {
    try {
      setError("");

      if (!isLoading) {
        await returnBook(borrowingId).unwrap();
      }

      toast.success("Вы успешно вернули книгу");
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);

      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }

      toast.error("Не удалось вернуть книгу");
    }
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {error && <div className="text-destructive">{error}</div>}
      <Button size="lg" loading={isLoading} onClick={handleReturnBook}>
        Вернуть книгу
      </Button>
    </div>
  );
};
