"use client";

import { FC, useEffect, useState } from "react";
import { LibraryBig, LogIn, Ticket } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/src/shared/lib";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Spinner,
} from "@/src/shared/shadcn";
import { useAuth } from "@/src/shared/hooks";
import { MenuLink } from "./MenuLink";

interface Props {
  className?: string;
}

export const Menu: FC<Props> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

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
        <MenuLink pathname={pathname} href="/">
          <LibraryBig className="size-6" />
          <div className="font-normal text-sm">Книги</div>
        </MenuLink>
        <MenuLink pathname={pathname} href="/borrowings">
          <Ticket className="size-6" />
          <div className="font-normal">Аренды</div>
        </MenuLink>
        {isLoading ? (
          <div className="w-[72px] h-[58px] flex items-center justify-center">
            <Spinner className="text-foreground" />
          </div>
        ) : isAuthenticated ? (
          <MenuLink pathname={pathname} href="/profile">
            <Avatar className="size-6">
              <AvatarImage src={user?.avatarURL ? user.avatarURL : undefined} />
              <AvatarFallback>{user?.firstName[0]}</AvatarFallback>
            </Avatar>
            <div className="font-normal">Профиль</div>
          </MenuLink>
        ) : (
          <MenuLink pathname={pathname} href="/login">
            <LogIn className="size-6" />
            <div className="font-normal">Вход</div>
          </MenuLink>
        )}
      </div>
    </nav>
  );
};
