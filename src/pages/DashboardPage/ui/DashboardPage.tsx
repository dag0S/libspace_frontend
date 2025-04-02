import { Container } from "@/src/shared/ui";
import { DashboardCard, IDashboardCard } from "@/src/widgets/DashboardCard";

import { FC } from "react";

const dashboardCardContent: IDashboardCard[] = [
  {
    title: "Книги",
    description:
      "Управление каталогом книг: добавление, редактирование, удаление и просмотр всех доступных изданий.",
    href: "/dashboard/books",
  },
  {
    title: "Пользователи",
    description:
      "Просмотр списка пользователей, управление их аккаунтами, а также настройка прав доступа.",
    href: "/dashboard/users",
  },
  {
    title: "Книги, взятые в аренду",
    description:
      "Отслеживание книг, находящихся в аренде, информация о сроках возврата и пользователях, взявших книги.",
    href: "/dashboard/borrowings",
  },
  {
    title: "Авторы",
    description:
      "Добавление, редактирование и управление информацией об авторах, включая их биографию и опубликованные книги.",
    href: "/dashboard/authors",
  },
  {
    title: "Жанры",
    description:
      "Создание и редактирование жанров, упрощая классификацию и поиск книг в библиотеке.",
    href: "/dashboard/genres",
  },
  {
    title: "Логи",
    description:
      "Мониторинг действий пользователей и системных событий для обеспечения безопасности и контроля за изменениями.",
    href: "/dashboard/logs",
  },
];

const DashboardPage: FC = () => {
  return (
    <Container>
      <h2 className="text-3xl font-semibold mb-2">Панель управления</h2>
      <div className="grid grid-cols-1 gap-2">
        {dashboardCardContent.map((card) => (
          <DashboardCard card={card} key={card.title} />
        ))}
      </div>
    </Container>
  );
};

export default DashboardPage;
