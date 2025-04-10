"use client";

import { FC, useState } from "react";
import toast from "react-hot-toast";

import { cn } from "@/src/shared/lib";
import { Button } from "@/src/shared/shadcn";
import { isErrorWithMessage } from "@/src/shared/utils";
import { useDeleteLogMutation } from "@/src/entities/Log";

interface Props {
  className?: string;
  logId: string;
}

export const DeleteLog: FC<Props> = ({ className, logId }) => {
  const [deleteLog, { isLoading }] = useDeleteLogMutation();
  const [error, setError] = useState("");

  const handleDeleteGenre = async () => {
    try {
      setError("");

      if (!isLoading) {
        await deleteLog(logId).unwrap();
      }

      toast.success("Вы успешно удалили лог пользователя");
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);

      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }

      toast.error("Не удалось удалить лог пользователя");
    }
  };

  return (
    <div className={cn("w-full flex flex-col gap-6 mb-2", className)}>
      <div>
        Это действие нельзя отменить. Это приведет к необратимому удалению лога
        пользователя.
      </div>
      <Button onClick={handleDeleteGenre} variant="destructive">
        Удалить лог пользователя
      </Button>
      {error && <div className="text-destructive">{error}</div>}
    </div>
  );
};
