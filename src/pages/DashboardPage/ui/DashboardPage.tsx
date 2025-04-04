import { FC } from "react";

import { MENU_LIST } from "@/src/shared/constant";
import { Container } from "@/src/shared/ui";
import { DashboardCard, IDashboardCard } from "@/src/widgets/DashboardCard";

const dashboardCardContent: IDashboardCard[] = [
  {
    title: "Книги",
    description:
      "Управление каталогом книг: добавление, редактирование, удаление и просмотр всех доступных изданий.",
    href: MENU_LIST.dashboard_books,
  },
  {
    title: "Пользователи",
    description:
      "Просмотр списка пользователей, управление их аккаунтами, а также настройка прав доступа.",
    href: MENU_LIST.dashboard_users,
  },
  {
    title: "Книги, взятые в аренду",
    description:
      "Отслеживание книг, находящихся в аренде, информация о сроках возврата и пользователях, взявших книги.",
    href: MENU_LIST.dashboard_borrowings,
  },
  {
    title: "Авторы",
    description:
      "Добавление, редактирование и управление информацией об авторах, включая их биографию и опубликованные книги.",
    href: MENU_LIST.dashboard_authors,
  },
  {
    title: "Жанры",
    description:
      "Создание и редактирование жанров, упрощая классификацию и поиск книг в библиотеке.",
    href: MENU_LIST.dashboard_genres,
  },
  {
    title: "Логи",
    description:
      "Мониторинг действий пользователей и системных событий для обеспечения безопасности и контроля за изменениями.",
    href: MENU_LIST.dashboard_logs,
  },
];

const DashboardPage: FC = () => {
  return (
    <Container>
      <h2 className="text-3xl font-semibold mb-2">Панель управления</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 mb-2">
        {dashboardCardContent.map((card) => (
          <DashboardCard card={card} key={card.title} />
        ))}
      </div>
    </Container>
  );
};

export default DashboardPage;
