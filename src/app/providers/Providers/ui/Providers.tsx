"use client";

import { FC, ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";

import { StoreProvider } from "../../StoreProvider";
import { ThemeProvider } from "../../ThemeProvider";
import { AuthProvider } from "../../AuthProvider";

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
        <AuthProvider>
          <NextTopLoader showSpinner={false} color="#2563ea" />
          {children}
        </AuthProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};
