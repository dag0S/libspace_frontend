"use client";

import { FC, useEffect, useState } from "react";
import { LibraryBig, LogIn, Ticket } from "lucide-react";
import Link from "next/link";

import { cn } from "@/src/shared/lib";
import { Button } from "@/src/shared/shadcn";

interface Props {
  className?: string;
}

export const Menu: FC<Props> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        "bg-gradient-to-t from-background fixed bottom-0 h-22 w-full flex items-center justify-center transition-transform duration-300 ease-in-out",
        className,
        {
          "translate-y-24": !isVisible,
        }
      )}
    >
      <div className={cn("flex gap-1 p-2 bg-blue-100 dark:bg-blue-700 rounded-2xl")}>
        <Link href="/">
          <Button
            variant="ghost"
            className="flex-col gap-1 h-full w-[68px] has-[>svg]:p-1"
          >
            <LibraryBig className="size-6" />
            <div className="font-normal">Книги</div>
          </Button>
        </Link>
        <Link href="/">
          <Button
            variant="ghost"
            className="flex-col gap-1 h-full w-[68px] has-[>svg]:p-1"
          >
            <Ticket className="size-6" />
            <div className="font-normal">Аренды</div>
          </Button>
        </Link>
        <Link href="/login">
          <Button
            variant="ghost"
            className="flex-col gap-1 h-full w-[68px] has-[>svg]:p-1"
          >
            <LogIn className="size-6" />
            <div className="font-normal">Вход</div>
          </Button>
        </Link>
      </div>
    </div>
  );
};
