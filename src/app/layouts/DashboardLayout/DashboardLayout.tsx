import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Header } from "@/src/widgets/Header";
import { SidebarProvider, SidebarTrigger } from "@/src/shared/shadcn";
import { DashBoardSidebar } from "@/src/widgets/DashBoardSidebar";
import { authCheck } from "@/src/shared/utils/authCheck";
import { MENU_LIST } from "@/src/shared/constant";
import { Role } from "@/src/shared/types";

export const metadata: Metadata = {
  title: "Lib Space | Панель управления",
  description: "Generated by create next app",
};

const ALLOWED_ROLES: Role[] = ["ADMIN", "LIBRARIAN"];

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await authCheck();

  if (!user) {
    redirect(MENU_LIST.not_found);
  }

  if (!ALLOWED_ROLES.includes(user.role)) {
    redirect(MENU_LIST.not_found);
  }

  return (
    <SidebarProvider>
      <DashBoardSidebar user={user} />
      <div className="flex flex-col w-full">
        <Header
          className="mb-2"
          hasFilters={false}
          hasGrid={false}
          hasSearch={false}
          sidebarTrigger={<SidebarTrigger />}
        />
        <main className="flex-1 flex">{children}</main>
      </div>
    </SidebarProvider>
  );
}
