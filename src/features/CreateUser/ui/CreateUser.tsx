"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/shadcn";
import {
  createUserFormSchema,
  useCreateUserMutation,
  UserCreationData,
} from "@/src/entities/User";
import { getRoleName, isErrorWithMessage } from "@/src/shared/utils";

interface Props {
  className?: string;
  setOpenDrawer: (open: boolean) => void;
}

export const CreateUser: FC<Props> = ({ className, setOpenDrawer }) => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [error, setError] = useState("");
  const form = useForm<UserCreationData>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      role: "READER",
    },
  });

  const onSubmit = async (values: UserCreationData) => {
    try {
      setError("");

      if (!isLoading) {
        await createUser(values).unwrap();
      }

      setOpenDrawer(false);
      form.reset();
      toast.success("Вы успешно создали нового пользователя");
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);

      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }

      toast.error("Не удалось создать пользователя");
    }
  };

  return (
    <div className="mb-2">
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
            name="role"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="mb-2">Роль</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите роль" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="READER">
                      {getRoleName("READER")}
                    </SelectItem>
                    <SelectItem value="LIBRARIAN">
                      {getRoleName("LIBRARIAN")}
                    </SelectItem>
                    <SelectItem value="ADMIN">
                      {getRoleName("ADMIN")}
                    </SelectItem>
                  </SelectContent>
                </Select>
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
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            Создать пользователя
          </Button>
          {error && <div className="text-destructive">{error}</div>}
        </form>
      </Form>
    </div>
  );
};
