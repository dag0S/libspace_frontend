"use client";

import { useMeQuery } from "@/src/features/Auth/api/api";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const {} = useMeQuery();

  return <>{children}</>;
};
