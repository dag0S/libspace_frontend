import { FC } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/shadcn";
import { IDashboardCard } from "../types/types";
import { Role } from "@/src/shared/types";

interface Props {
  className?: string;
  card: IDashboardCard;
  role: Role;
}

export const DashboardCard: FC<Props> = ({ card, role }) => {
  if (!card.role.includes(role)) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {card.icon}
          <div> {card.title}</div>
        </CardTitle>
        <CardDescription>{card.description}</CardDescription>
      </CardHeader>
      <CardFooter className="justify-end">
        <Link href={card.href}>
          <Button className="cursor-pointer">
            <div>Перейти</div>
            <ArrowRight />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
