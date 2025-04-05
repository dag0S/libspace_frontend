"use client";

import { FC, useEffect, useState } from "react";
import { ChartPie, LibraryBig, LogIn, Ticket } from "lucide-react";

import { cn } from "@/src/shared/lib";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Spinner,
} from "@/src/shared/shadcn";
import { MenuLink } from "./MenuLink";
import { useMeQuery } from "@/src/features/Auth/api/api";
import { MENU_LIST } from "@/src/shared/constant";

interface Props {
  className?: string;
}

export const Menu: FC<Props> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { data: user, isLoading } = useMeQuery();

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
    <nav
      className={cn(
        "bg-gradient-to-t from-background fixed bottom-0 h-22 w-full flex items-center justify-center transition-transform duration-300 ease-in-out",
        className,
        {
          "translate-y-24": !isVisible,
        }
      )}
    >
      <div
        className={cn(
          "flex gap-1 p-2 bg-blue-100 dark:bg-blue-700 rounded-2xl"
        )}
      >
        <MenuLink href={MENU_LIST.main}>
          <LibraryBig className="size-6" />
          <div className="font-normal text-sm">Книги</div>
        </MenuLink>
        {user && (
          <MenuLink href={MENU_LIST.borrowings}>
            <Ticket className="size-6" />
            <div className="font-normal">Аренды</div>
          </MenuLink>
        )}
        {isLoading ? (
          <div className="w-[72px] h-[58px] flex items-center justify-center">
            <Spinner className="text-foreground" />
          </div>
        ) : user ? (
          <MenuLink href={MENU_LIST.profile}>
            <Avatar className="size-6 text-sm border-foreground border-2">
              <AvatarImage src={user?.avatarURL ? user.avatarURL : undefined} />
              <AvatarFallback>{user?.firstName[0]}</AvatarFallback>
            </Avatar>
            <div className="font-normal">Профиль</div>
          </MenuLink>
        ) : (
          <MenuLink href={MENU_LIST.login}>
            <LogIn className="size-6" />
            <div className="font-normal">Вход</div>
          </MenuLink>
        )}
        {user && (user.role === "ADMIN" || user.role === "LIBRARIAN") && (
          <MenuLink href={MENU_LIST.dashboard}>
            <ChartPie className="size-6" />
            <div className="font-normal">Админка</div>
          </MenuLink>
        )}
      </div>
    </nav>
  );
};
