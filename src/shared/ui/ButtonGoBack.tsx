"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/src/shared/lib";
import { Button } from "../shadcn";

interface Props {
  className?: string;
}

export const ButtonGoBack: FC<Props> = ({ className }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      size="icon"
      variant="ghost"
      className={cn("", className)}
    >
      <ArrowLeft />
    </Button>
  );
};
