"use client";

import { FC, useState } from "react";
import toast from "react-hot-toast";

import { cn } from "@/src/shared/lib";
import { Button } from "@/src/shared/shadcn";
import { isErrorWithMessage } from "@/src/shared/utils";
import { useDeleteAuthorMutation } from "@/src/entities/Author";

interface Props {
  className?: string;
  authorId: string;
}

export const DeleteAuthor: FC<Props> = ({ className, authorId }) => {
  const [deleteAuthor, { isLoading }] = useDeleteAuthorMutation();
  const [error, setError] = useState("");

  const handleDeleteAuthor = async () => {
    try {
      setError("");

      if (!isLoading) {
        await deleteAuthor(authorId).unwrap();
      }

      toast.success("Вы успешно удалили автора");
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);

      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }

      toast.error("Не удалось удалить автора");
    }
  };

  return (
    <div className={cn("w-full flex flex-col gap-6 mb-2", className)}>
      <div>
        Это действие нельзя отменить. Это приведет к необратимому удалению
        автора.
      </div>
      <Button onClick={handleDeleteAuthor} variant="destructive">
        Удалить автора
      </Button>
      {error && <div className="text-destructive">{error}</div>}
    </div>
  );
};
