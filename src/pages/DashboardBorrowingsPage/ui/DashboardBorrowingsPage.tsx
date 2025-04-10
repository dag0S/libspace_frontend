import { Metadata } from "next";
import { FC } from "react";

import { Container } from "@/src/shared/ui";
import { DashboardUsersList } from "@/src/widgets/DashboardUsersList";

export const metadata: Metadata = {
  title: "Lib Space | Панель управления | Книги, взятые в аренду",
  description: "Generated by create next app",
};

const DashboardBorrowingsPage: FC = () => {
  return (
    <Container>
      <h2 className="text-3xl font-semibold mb-4">Книги, взятые в аренду</h2>
      <DashboardUsersList hasBorrowing />
    </Container>
  );
};

export default DashboardBorrowingsPage;
