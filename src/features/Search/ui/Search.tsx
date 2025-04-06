"use client";

import { ChangeEvent, FC } from "react";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { cn } from "@/src/shared/lib";
import { Button, Input } from "@/src/shared/shadcn";
import { useAppDispatch, useAppSelector } from "@/src/shared/hooks";
import { searchActions } from "../model/slice";

interface Props {
  className?: string;
}

export const Search: FC<Props> = ({ className }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.search);

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams?.toString());

    if (value) {
      params.set("searchBy", value);
    } else {
      params.delete("searchBy");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 1000);

  const handleSetSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchActions.setSearchValue(value));
    handleSearch(value);
  };

  const handleClear = () => {
    dispatch(searchActions.clearSearchValue());
    const params = new URLSearchParams(searchParams?.toString());
    params.delete("searchBy");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={cn("relative", className)}>
      <Input
        placeholder="Поиск"
        className="pr-9"
        onChange={handleSetSearch}
        value={searchValue || ""}
      />
      {searchValue && (
        <Button
          onClick={handleClear}
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0"
        >
          <X />
        </Button>
      )}
    </div>
  );
};
