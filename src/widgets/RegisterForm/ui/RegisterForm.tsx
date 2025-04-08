"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
import {
  Register,
  registerFormSchema,
  useRegisterMutation,
} from "@/src/features/Auth";
import { isErrorWithMessage } from "@/src/shared/utils";

interface Props {
  className?: string;
}

export const RegisterForm: FC<Props> = ({ className }) => {
  const [userRegister, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState("");
  const router = useRouter();
  const form = useForm<Register>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: Register) => {
    try {
      setError("");

      if (!isLoading) {
        await userRegister(values).unwrap();
        router.push("/");
      }

      toast.success("Вы успешно зарегистрировались");
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);

      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }

      toast.error("Не удалось зарегистрироваться");
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
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="mb-2">Имя</FormLabel>
              <FormControl>
                <Input placeholder="Имя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="mb-2">Фамилия</FormLabel>
              <FormControl>
                <Input placeholder="Фамилия" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="mb-2">Подтверждение пароля</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Подтверждение пароля"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" size="lg">
          Зарегистрироваться
        </Button>
        {error && <div className="text-destructive">{error}</div>}
      </form>
    </Form>
  );
};
