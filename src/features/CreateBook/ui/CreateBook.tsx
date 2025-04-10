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
  Textarea,
} from "@/src/shared/shadcn";
import { isErrorWithMessage } from "@/src/shared/utils";
import {
  BookCreationData,
  createBookFormSchema,
  useCreateBookMutation,
} from "@/src/entities/Book";
import { useGetAuthorsQuery } from "@/src/entities/Author";

interface Props {
  className?: string;
}

export const CreateBook: FC<Props> = ({ className }) => {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const { data: authors } = useGetAuthorsQuery();
  const [error, setError] = useState("");
  const form = useForm<BookCreationData>({
    resolver: zodResolver(createBookFormSchema),
    defaultValues: {
      title: "",
      description: "",
      copies: 1,
      authorId: "",
    },
  });

  const onSubmit = async (values: BookCreationData) => {
    try {
      setError("");

      if (!isLoading) {
        await createBook(values).unwrap();
      }

      form.reset();
      toast.success("Вы успешно добавили книгу");
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);

      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }

      toast.error("Не удалось добавить книгу");
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
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="mb-2">Название</FormLabel>
                <FormControl>
                  <Input placeholder="Название" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="mb-2">Описание</FormLabel>
                <Textarea placeholder="Описание" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="mb-2">Количество копий</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="Количество копий"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="authorId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="mb-2">Автор</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите автора" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {authors &&
                      authors.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                          {author.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
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
            Добавить книгу
          </Button>
          {error && <div className="text-destructive">{error}</div>}
        </form>
      </Form>
    </div>
  );
};
