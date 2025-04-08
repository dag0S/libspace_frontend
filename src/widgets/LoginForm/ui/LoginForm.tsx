"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { cn } from "@/src/shared/lib";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/src/shared/shadcn";
import { Login, loginFormSchema, useLoginMutation } from "@/src/features/Auth";
import { isErrorWithMessage } from "@/src/shared/utils";

interface Props {
  className?: string;
}

export const LoginForm: FC<Props> = ({ className }) => {
  const [userLogin, { isLoading }] = useLoginMutation();
  const [error, setError] = useState("");
  const router = useRouter();
  const form = useForm<Login>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: Login) => {
    try {
      setError("");

      if (!isLoading) {
        await userLogin(values).unwrap();
        router.push("/");
      }

      toast.success("Вы успешно вошли в свой аккаунт");
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);

      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }

      toast.error("Не удалось войти в аккаунт");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("w-full flex flex-col gap-6 items-center", className)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="mb-2">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="mb-2">Пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Пароль" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          Войти
        </Button>
        {error && <div className="text-destructive">{error}</div>}
      </form>
    </Form>
  );
};
