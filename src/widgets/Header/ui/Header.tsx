import { FC } from "react";
import {
  BadgeAlert,
  EllipsisVertical,
  Grid3x3,
  Heart,
  ListFilter,
  Search,
} from "lucide-react";

import { cn } from "@/src/shared/lib";
import { Container } from "@/src/shared/ui";
import { Button } from "@/src/shared/shadcn";

interface Props {
  className?: string;
}

export const Header: FC<Props> = ({ className }) => {
  return (
    <div className={cn("border-b py-2", className)}>
      <Container className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="text-2xl font-bold">LibSpace</div>
          <div>
            <Button variant="ghost" size="icon">
              <Search />
            </Button>
            <Button variant="ghost" size="icon">
              <Grid3x3 />
            </Button>
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          </div>
        </div>

        <div className="flex gap-2 overflow-auto">
          <Button variant="outline">
            <Heart />
            <div>Популярные</div>
          </Button>
          <Button variant="outline">
            <BadgeAlert />
            <div>Последние</div>
          </Button>
          <Button variant="outline">
            <ListFilter />
            <div>Фильтрация</div>
          </Button>
        </div>
      </Container>
    </div>
  );
};
