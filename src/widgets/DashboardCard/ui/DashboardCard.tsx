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

interface Props {
  className?: string;
  card: IDashboardCard;
}

export const DashboardCard: FC<Props> = ({ card }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{card.title}</CardTitle>
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
