"use client";

import { FC, ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";

import { StoreProvider } from "../../StoreProvider";
import { ThemeProvider } from "../../ThemeProvider";

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <StoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NextTopLoader showSpinner={false} color="#2563ea" />
        {children}
      </ThemeProvider>
    </StoreProvider>
  );
};
