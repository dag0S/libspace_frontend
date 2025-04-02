"use client";

import { FC } from "react";
import { redirect } from "next/navigation";
import { Edit3, LogOut } from "lucide-react";

import { cn } from "@/src/shared/lib";
import { useAppDispatch, useAppSelector } from "@/src/shared/hooks";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/shadcn";
import { getRoleName, isErrorWithMessage } from "@/src/shared/utils";
import { authApi, useLogoutMutation } from "@/src/features/Auth/api/api";

interface Props {
  className?: string;
}

export const ProfileContent: FC<Props> = ({ className }) => {
  const { user } = useAppSelector((state) => state.authUser);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  if (!user) {
    redirect("/login");
  }

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(authApi.util.resetApiState());
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);
      console.log(err);
      if (mayBeError) {
        console.error(err.data.message);
      } else {
        console.error("Неизвестная ошибка");
      }
    }
    redirect("/login");
  };

  return (
    <div className={cn("", className)}>
      <Card>
        <CardHeader>
          <CardTitle>Профиль</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 overflow-hidden">
          <div className="flex flex-col items-center mb-3">
            <Avatar className="size-[200px] text-8xl">
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_IMAGES_API_URL}${user.avatarURL}`}
                alt={user.firstName}
              />
              <AvatarFallback>{user.firstName[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-4xl">{`${user.firstName} ${user.lastName}`}</h2>
            <div>{getRoleName(user.role)}</div>
          </div>
          <div>
            <div className="font-medium">Имя</div>
            <div className="text-2xl">{user.firstName}</div>
          </div>
          <div>
            <div className="font-medium ">Фамилия</div>
            <div className="text-2xl">{user.lastName}</div>
          </div>
          <div>
            <div className="font-medium">Email</div>
            <div className="text-2xl">{user.email}</div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Button variant="secondary">
            <div>Редактировать профиль</div>
            <Edit3 />
          </Button>
          <Button onClick={handleLogout}>
            <div>Выйти</div>
            <LogOut />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
