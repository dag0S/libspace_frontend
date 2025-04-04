"use client";

import { FC, ReactNode } from "react";
import {
  ArrowLeft,
  BadgeAlert,
  Grid3x3,
  Heart,
  ListFilter,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/src/shared/lib";
import { Container } from "@/src/shared/ui";
import { Button } from "@/src/shared/shadcn";
import { SwitchTheme } from "@/src/features/SwitchTheme";
import { FilterDrawer } from "../../FilterDrawer";
import { MENU_LIST } from "@/src/shared/constant";

interface Props {
  className?: string;
  hasFilters?: boolean;
  hasGoBack?: boolean;
  hasSearch?: boolean;
  hasGrid?: boolean;
  sidebarTrigger?: ReactNode;
}

export const Header: FC<Props> = ({
  className,
  hasFilters = true,
  hasGoBack = false,
  hasSearch = true,
  hasGrid = true,
  sidebarTrigger,
}) => {
  const router = useRouter();

  return (
    <header
      className={cn("border-b py-2 sticky top-0 z-10 bg-background", className)}
    >
      <Container className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {sidebarTrigger}
            {hasGoBack && (
              <Button onClick={() => router.back()} size="icon" variant="ghost">
                <ArrowLeft />
              </Button>
            )}
            <Link href={MENU_LIST.main} className="text-2xl font-bold">
              LibSpace
            </Link>
          </div>
          <div>
            {hasSearch && (
              <Button variant="ghost" size="icon">
                <Search />
              </Button>
            )}
            {hasGrid && (
              <Button variant="ghost" size="icon">
                <Grid3x3 />
              </Button>
            )}
            <SwitchTheme />
          </div>
        </div>

        {hasFilters && (
          <div className="flex gap-2 overflow-auto">
            <Button variant="outline">
              <Heart />
              <div>Популярные</div>
            </Button>
            <Button variant="outline">
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
        )}
      </Container>
    </header>
  );
};
