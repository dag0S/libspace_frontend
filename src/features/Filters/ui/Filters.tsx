"use client";

import { FC, useEffect } from "react";
import { BadgeAlert, Heart, ListFilter } from "lucide-react";

import { cn } from "@/src/shared/lib";
import { Button } from "@/src/shared/shadcn";
import { FilterDrawer } from "@/src/widgets/FilterDrawer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  className?: string;
}

export const Filters: FC<Props> = ({ className }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentSort = searchParams?.get("sortBy") || "views";

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());

    if (!params.has("sortBy")) {
      params.set("sortBy", "views");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, []);

  const handleSortByOrder = (orderBy: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("sortBy", orderBy);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={cn("flex gap-2 overflow-auto", className)}>
      <Button
        variant={currentSort === "views" ? "secondary" : "outline"}
        onClick={() => handleSortByOrder("views")}
      >
        <Heart />
        <div>Популярные</div>
      </Button>
      <Button
        variant={currentSort === "createdAt" ? "secondary" : "outline"}
        onClick={() => handleSortByOrder("createdAt")}
      >
        <BadgeAlert />
        <div>Последние</div>
      </Button>
      <FilterDrawer>
        <Button variant="outline">
          <ListFilter />
          <div>Фильтрация</div>
        </Button>
      </FilterDrawer>
    </div>
  );
};
