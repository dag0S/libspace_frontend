import { Role } from "@/src/shared/types";
import { ReactNode } from "react";

export interface IDashboardCard {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
  role: Role[];
}
