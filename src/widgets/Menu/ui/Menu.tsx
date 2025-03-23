import { FC } from "react";
import { LibraryBig, LogIn, Ticket } from "lucide-react";
import Link from "next/link";

import { cn } from "@/src/shared/lib";
import { Button } from "@/src/shared/shadcn";

interface Props {
  className?: string;
}

export const Menu: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex gap-1 p-2 bg-blue-100 rounded-2xl fixed bottom-4 left-1/2 -translate-x-1/2",
        className
      )}
    >
      <Link href="/">
        <Button variant="ghost" className="flex-col gap-1 h-full w-[77px] has-[>svg]:p-1">
          <LibraryBig className="size-6" />
          <div className="font-normal">Книги</div>
        </Button>
      </Link>
      <Link href="/">
        <Button variant="ghost" className="flex-col gap-1 h-full w-[77px] has-[>svg]:p-1">
          <Ticket className="size-6" />
          <div className="font-normal">Аренды</div>
        </Button>
      </Link>
      <Link href="/login">
        <Button variant="ghost" className="flex-col gap-1 h-full w-[77px] has-[>svg]:p-1">
          <LogIn className="size-6" />
          <div className="font-normal">Вход</div>
        </Button>
      </Link>
    </div>
  );
};
