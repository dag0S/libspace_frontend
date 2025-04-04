import Link from "next/link";
import { FC } from "react";
import { redirect } from "next/navigation";

import { Separator } from "@/src/shared/shadcn";
import { Container } from "@/src/shared/ui";
import { RegisterForm } from "@/src/widgets/RegisterForm";
import { authCheck } from "@/src/shared/utils";
import { MENU_LIST } from "@/src/shared/constant";

const LoginPage: FC = async () => {
  const { isAuthenticated } = await authCheck();

  if (isAuthenticated) {
    redirect(MENU_LIST.profile);
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Container className="px-5 flex flex-col gap-6 items-center">
        <Link href="/">
          <h2 className="text-4xl font-medium">LibSpace</h2>
        </Link>
        <Separator />
        <h3 className="text-2xl">Регистрация</h3>
        <RegisterForm />
        <div>
          Уже есть аккаунта?{" "}
          <Link href="/login" className="font-medium text-primary">
            Вход
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
