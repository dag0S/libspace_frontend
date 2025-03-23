import Link from "next/link";
import { FC } from "react";

import { Button, Input, Label, Separator } from "@/src/shared/shadcn";
import { Container } from "@/src/shared/ui";

const LoginPage: FC = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Container className="px-5 flex flex-col gap-6 items-center">
        <Link href="/">
          <h2 className="text-4xl font-medium">LibSpace</h2>
        </Link>
        <Separator />
        <h3 className="text-2xl">Регистрация</h3>
        <div className="w-full">
          <Label htmlFor="first-name" className="mb-2">
            Имя
          </Label>
          <Input id="first-name" placeholder="Имя" />
        </div>
        <div className="w-full">
          <Label htmlFor="last-name" className="mb-2">
            Фамилия
          </Label>
          <Input id="last-name" placeholder="Фамилия" />
        </div>
        <div className="w-full">
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div className="w-full">
          <Label htmlFor="password" className="mb-2">
            Пароль
          </Label>
          <Input type="password" id="password" placeholder="Пароль" />
        </div>
        <div className="w-full">
          <Label htmlFor="confirm-password" className="mb-2">
            Подтверждение пароля
          </Label>
          <Input
            type="password"
            id="confirm-password"
            placeholder="Подтверждение пароля"
          />
        </div>
        <Button className="w-full" size="lg">
          Войти
        </Button>
        <div>
          Уже есть аккаунта?{" "}
          <Link href="/login" className="font-medium">
            Вход
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
