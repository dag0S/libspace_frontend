import { Role } from "@/src/shared/types";
import { ReactNode } from "react";

export interface IMenuItem {
  title: string;
  href: string;
  icon: ReactNode;
  role: Role[];
}
