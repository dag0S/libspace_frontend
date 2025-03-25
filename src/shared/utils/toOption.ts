import { IGenre } from "@/src/entities/Genre";
import { IAuthor } from "@/src/entities/Author";
import { Option } from "../shadcn";

export const genreToOption = (item: IGenre): Option => {
  return {
    label: item.name,
    value: item.id,
  };
};

export const authorToOption = (item: IAuthor): Option => {
  return {
    label: item.name,
    value: item.id,
  };
};
