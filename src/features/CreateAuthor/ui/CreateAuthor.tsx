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
} from "@/src/shared/shadcn";
import { isErrorWithMessage } from "@/src/shared/utils";
import {
  AuthorCreationData,
  createAuthorFormSchema,
  useCreateAuthorMutation,
} from "@/src/entities/Author";

interface Props {
  className?: string;
}

export const CreateAuthor: FC<Props> = ({ className }) => {
  const [createAuthor, { isLoading }] = useCreateAuthorMutation();
  const [error, setError] = useState("");
  const form = useForm<AuthorCreationData>({
    resolver: zodResolver(createAuthorFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: AuthorCreationData) => {
    try {
      setError("");

      if (!isLoading) {
        await createAuthor(values).unwrap();
      }

      form.reset();
      toast.success("Вы успешно добавили автора");
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);

      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }

      toast.error("Не удалось добавить автора");
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
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="mb-2">Наименование</FormLabel>
                <FormControl>
                  <Input placeholder="Наименование" {...field} />
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
            Добавить автора
          </Button>
          {error && <div className="text-destructive">{error}</div>}
        </form>
      </Form>
    </div>
  );
};
