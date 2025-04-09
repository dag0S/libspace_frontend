import { FC, ReactNode } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/shared/shadcn";
import { Container } from "@/src/shared/ui";

interface Props {
  children: ReactNode;
  title: string;
  content: ReactNode;
}

export const DashboardDrawer: FC<Props> = ({ children, title, content }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <Container className="flex-1 overflow-y-auto" variant="sm">
          <DrawerHeader>
            <DrawerTitle className="mb-2 text-xl">{title}</DrawerTitle>
          </DrawerHeader>
          {content}
        </Container>
      </DrawerContent>
    </Drawer>
  );
};
