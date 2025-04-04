"use client";

import { FC } from "react";
import {
  BookCopy,
  ChartPie,
  House,
  LibraryBig,
  ScrollText,
  Ticket,
  UserPen,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/src/shared/shadcn";
import { IMenuItem } from "../types/types";
import { MENU_LIST } from "@/src/shared/constant";
import { ResponseUserDate } from "@/src/features/Auth";

interface Props {
  user: ResponseUserDate;
}

const menuItems: IMenuItem[] = [
  {
    title: "Главная страница сайта",
    href: MENU_LIST.main,
    icon: <House />,
  },
  {
    title: "Панель управления",
    href: MENU_LIST.dashboard,
    icon: <ChartPie />,
  },
  {
    title: "Книги",
    href: MENU_LIST.dashboard_books,
    icon: <LibraryBig />,
  },
  {
    title: "Пользователи",
    href: MENU_LIST.dashboard_users,
    icon: <Users />,
  },
  {
    title: "Книги, взятые в аренду",
    href: MENU_LIST.dashboard_borrowings,
    icon: <Ticket />,
  },
  {
    title: "Авторы",
    href: MENU_LIST.dashboard_authors,
    icon: <UserPen />,
  },
  {
    title: "Жанры",
    href: MENU_LIST.dashboard_genres,
    icon: <BookCopy />,
  },
  {
    title: "Логи",
    href: MENU_LIST.dashboard_logs,
    icon: <ScrollText />,
  },
];

export const DashBoardSidebar: FC<Props> = ({ user }) => {
  const pathname = usePathname();

  return (
    <Sidebar className="z-20">
      <SidebarHeader>
        <Link href={MENU_LIST.profile} className="flex items-center gap-2">
          <Avatar className="size-[60px] text-2xl">
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_IMAGES_API_URL}${user.avatarURL}`}
              alt={user.firstName}
            />
            <AvatarFallback>{user.firstName[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl">{`${user.firstName} ${user.lastName}`}</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Панель управления</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href} className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
