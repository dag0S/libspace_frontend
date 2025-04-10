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
  IBookWithGenresAndAuthor,
  useEditBookMutation,
} from "@/src/entities/Book";
import { useGetAuthorsQuery } from "@/src/entities/Author";

interface Props {
  className?: string;
  book: IBookWithGenresAndAuthor;
}

export const EditBook: FC<Props> = ({ className, book }) => {
  const [editBook, { isLoading }] = useEditBookMutation();
  const { data: authors } = useGetAuthorsQuery();
  const [error, setError] = useState("");
  const form = useForm<BookCreationData>({
    resolver: zodResolver(createBookFormSchema),
    defaultValues: {
      authorId: book.authorId,
      copies: book.copies,
      description: book.description,
      title: book.title,
    },
  });

  const onSubmit = async (values: BookCreationData) => {
    try {
      setError("");

      if (!isLoading) {
        await editBook({ bookId: book.id, data: values }).unwrap();
      }

      form.reset();
      toast.success("Вы успешно изменили данные о книге");
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);

      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }

      toast.error("Не удалось изменить данные о книге");
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
                    min={0}
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
            Отправить
          </Button>
          {error && <div className="text-destructive">{error}</div>}
        </form>
      </Form>
    </div>
  );
};
