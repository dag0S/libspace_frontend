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
  createGenreFormSchema,
  GenreCreationData,
  IGenre,
  useEditGenreMutation,
} from "@/src/entities/Genre";

interface Props {
  className?: string;
  genre: IGenre;
}

export const EditGenre: FC<Props> = ({ className, genre }) => {
  const [editGenre, { isLoading }] = useEditGenreMutation();
  const [error, setError] = useState("");
  const form = useForm<GenreCreationData>({
    resolver: zodResolver(createGenreFormSchema),
    defaultValues: {
      name: genre.name,
    },
  });

  const onSubmit = async (values: GenreCreationData) => {
    try {
      setError("");

      if (!isLoading) {
        await editGenre({ genreId: genre.id, data: values }).unwrap();
      }

      form.reset();
      toast.success("Вы успешно изменили жанр");
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);

      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }

      toast.error("Не удалось изменить жанр");
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
                <FormLabel className="mb-2">Название</FormLabel>
                <FormControl>
                  <Input placeholder="Название" {...field} />
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
            Отправить
          </Button>
          {error && <div className="text-destructive">{error}</div>}
        </form>
      </Form>
    </div>
  );
};
