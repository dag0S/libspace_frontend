"use client";

import { FC, useState } from "react";
import toast from "react-hot-toast";

import { cn } from "@/src/shared/lib";
import { Button } from "@/src/shared/shadcn";
import { isErrorWithMessage } from "@/src/shared/utils";
import { useDeleteGenreMutation } from "@/src/entities/Genre";

interface Props {
  className?: string;
  genreId: string;
}

export const DeleteGenre: FC<Props> = ({ className, genreId }) => {
  const [deleteGenre, { isLoading }] = useDeleteGenreMutation();
  const [error, setError] = useState("");

  const handleDeleteGenre = async () => {
    try {
      setError("");

      if (!isLoading) {
        await deleteGenre(genreId).unwrap();
      }

      toast.success("Вы успешно удалили жанр");
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);

      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }

      toast.error("Не удалось удалить жанр");
    }
  };

  return (
    <div className={cn("w-full flex flex-col gap-6 mb-2", className)}>
      <div>
        Это действие нельзя отменить. Это приведет к необратимому удалению
        жанра.
      </div>
      <Button onClick={handleDeleteGenre} variant="destructive">
        Удалить жанр
      </Button>
      {error && <div className="text-destructive">{error}</div>}
    </div>
  );
};
