"use client";

import { FC } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

interface Props {
  className?: string;
}

const registerFormSchema = z
  .object({
    firstName: z.string().min(2, "Имя должно быть длинее 2 символов"),
    lastName: z.string().min(2, "Фамилия должно быть длинее 2 символов"),
    email: z.string().email("Введите корректный email-адрес"),
    password: z
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .max(64, "Пароль не должен превышавть 64 символа")
      .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
      .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
      .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
      .regex(
        /[~!?@#$%^&*_+\-()\[\]{}><\/\\|"',.:]/,
        "Пароль должен содержать хотя бы один спецсимвол (~!?@#$%^&*_+-()[]{}><\\/|\"',.:)"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const RegisterForm: FC<Props> = ({ className }) => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
    console.log(values);
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
                <Input type="password" placeholder="пароль" {...field} />
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
      </form>
    </Form>
  );
};
