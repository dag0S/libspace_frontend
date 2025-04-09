import { FC } from "react";

import { Container } from "@/src/shared/ui";
import { DashboardCardsList } from "@/src/widgets/DashboardCardsList";

const DashboardPage: FC = () => {
  return (
    <Container className="mb-2">
      <h2 className="text-3xl font-semibold mb-2">Панель управления</h2>
      <DashboardCardsList />
    </Container>
  );
};

export default DashboardPage;
