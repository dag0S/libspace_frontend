import { FC, ReactNode } from "react";

import { cn } from "@/src/shared/lib";

interface Props {
  className?: string;
  children: ReactNode;
}

export const Container: FC<Props> = ({ className, children }) => {
  return <div className={cn("w-full px-2 mx-auto", className)}>{children}</div>;
};
