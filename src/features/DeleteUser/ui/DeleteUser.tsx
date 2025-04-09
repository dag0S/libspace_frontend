"use client";

import { FC, useState } from "react";
import toast from "react-hot-toast";

import { cn } from "@/src/shared/lib";
import { Button } from "@/src/shared/shadcn";
import { useDeleteUserMutation } from "@/src/entities/User";
import { isErrorWithMessage } from "@/src/shared/utils";

interface Props {
  className?: string;
  userId: string;
}

export const DeleteUser: FC<Props> = ({ className, userId }) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const [error, setError] = useState("");

  const handleDeleteUser = async () => {
    try {
      setError("");

      if (!isLoading) {
        await deleteUser(userId).unwrap();
      }

      toast.success("Вы успешно удалили пользователя");
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);

      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }

      toast.error("Не удалось удалить пользователя");
    }
  };

  return (
    <div className={cn("w-full flex flex-col gap-6 mb-2", className)}>
      <div>
        Это действие нельзя отменить. Это приведет к необратимому удалению всех
        данных о пользователе.
      </div>
      <Button onClick={handleDeleteUser} variant="destructive">
        Удалить пользователя
      </Button>
      {error && <div className="text-destructive">{error}</div>}
    </div>
  );
};
