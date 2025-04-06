"use client";

import { FC, ReactNode, useState } from "react";
import { ArrowLeft, Grid3x3, SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/src/shared/lib";
import { Container } from "@/src/shared/ui";
import { Button } from "@/src/shared/shadcn";
import { SwitchTheme } from "@/src/features/SwitchTheme";
import { MENU_LIST } from "@/src/shared/constant";
import { Search } from "@/src/features/Search";
import { Filters } from "@/src/features/Filters";

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
  const [showSearch, setShowSearch] = useState(false);

  const handleToggleShowSearch = () => {
    setShowSearch((prev) => !prev);
  };

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
          <div className="flex items-center gap-1">
            {hasSearch && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleShowSearch}
              >
                {showSearch ? <X /> : <SearchIcon />}
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
        {showSearch && hasSearch && <Search />}
        {hasFilters && <Filters />}
      </Container>
    </header>
  );
};
