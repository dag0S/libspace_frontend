import { FC } from "react";

import { Sidebar, SidebarContent } from "@/src/shared/shadcn";

interface Props {
  className?: string;
}

export const DashBoardSidebar: FC<Props> = ({  }) => {
  return (
    <Sidebar>
      <SidebarContent>df</SidebarContent>
    </Sidebar>
  );
};
