"use client";

import { FC, ReactNode, useState } from "react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/shared/shadcn";
import { Container } from "@/src/shared/ui";
import { CreateUser } from "@/src/features/CreateUser";

interface Props {
  children: ReactNode;
}

export const CreationUserDrawer: FC<Props> = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <Container className="flex-1 overflow-y-auto" variant="sm">
          <DrawerHeader>
            <DrawerTitle className="mb-2 text-xl">
              Создание пользователя
            </DrawerTitle>
          </DrawerHeader>
          <CreateUser setOpenDrawer={setOpenDrawer} />
        </Container>
      </DrawerContent>
    </Drawer>
  );
};
