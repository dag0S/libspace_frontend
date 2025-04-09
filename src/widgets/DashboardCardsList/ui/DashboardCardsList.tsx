"use client";

import { FC } from "react";
import {
  BookCopy,
  LibraryBig,
  ScrollText,
  Ticket,
  UserPen,
  Users,
} from "lucide-react";

import { cn } from "@/src/shared/lib";
import { MENU_LIST } from "@/src/shared/constant";
import { DashboardCard, IDashboardCard } from "@/src/entities/DashboardCard";
import { useAppSelector } from "@/src/shared/hooks";
import { DashboardCardsListSkeleton } from "./DashboardCardsListSkeleton";

const dashboardCardContent: IDashboardCard[] = [
  {
    title: "Книги",
    description:
      "Управление каталогом книг: добавление, редактирование, удаление и просмотр всех доступных изданий.",
    href: MENU_LIST.dashboard_books,
    icon: <LibraryBig />,
    role: ["ADMIN", "LIBRARIAN"],
  },
  {
    title: "Пользователи",
    description:
      "Просмотр списка пользователей, управление их аккаунтами, а также настройка прав доступа.",
    href: MENU_LIST.dashboard_users,
    icon: <Users />,
    role: ["ADMIN", "LIBRARIAN"],
  },
  {
    title: "Книги, взятые в аренду",
    description:
      "Отслеживание книг, находящихся в аренде, информация о сроках возврата и пользователях, взявших книги.",
    href: MENU_LIST.dashboard_borrowings,
    icon: <Ticket />,
    role: ["ADMIN", "LIBRARIAN"],
  },
  {
    title: "Авторы",
    description:
      "Добавление, редактирование и управление информацией об авторах, включая их биографию и опубликованные книги.",
    href: MENU_LIST.dashboard_authors,
    icon: <UserPen />,
    role: ["ADMIN", "LIBRARIAN"],
  },
  {
    title: "Жанры",
    description:
      "Создание и редактирование жанров, упрощая классификацию и поиск книг в библиотеке.",
    href: MENU_LIST.dashboard_genres,
    icon: <BookCopy />,
    role: ["ADMIN", "LIBRARIAN"],
  },
  {
    title: "Логи",
    description:
      "Мониторинг действий пользователей и системных событий для обеспечения безопасности и контроля за изменениями.",
    href: MENU_LIST.dashboard_logs,
    icon: <ScrollText />,
    role: ["ADMIN"],
  },
];

interface Props {
  className?: string;
}

export const DashboardCardsList: FC<Props> = ({ className }) => {
  const { user } = useAppSelector((state) => state.authUser);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4",
        className
      )}
    >
      {user ? (
        dashboardCardContent.map((card) => (
          <DashboardCard card={card} role={user.role} key={card.title} />
        ))
      ) : (
        <DashboardCardsListSkeleton />
      )}
    </div>
  );
};
