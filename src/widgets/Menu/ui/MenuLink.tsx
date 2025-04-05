import { FC, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/src/shared/lib";

interface Props {
  className?: string;
  children: ReactNode;
  href: string;
}

export const MenuLink: FC<Props> = ({ className, children, href }) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col gap-0.5 items-center justify-center rounded-lg w-[72px] p-1 hover:bg-accent dark:hover:bg-accent/50",
        className
      )}
    >
      {children}
    </Link>
  );
};
