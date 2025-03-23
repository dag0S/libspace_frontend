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
        <h3 className="text-2xl">Вход</h3>
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
        <Button className="w-full" size="lg">
          Войти
        </Button>
        <div>
          Нет аккаунта?{" "}
          <Link href="/register" className="font-medium">
            Регистрация
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
