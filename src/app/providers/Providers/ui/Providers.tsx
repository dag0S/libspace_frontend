"use client";

import { FC, ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

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
          <Toaster
            toastOptions={{
              className: "",
              style: {
                background: "var(--background)",
                color: "var(--foreground)",
                border: "2px solid var(--border)",
              },
            }}
          />
          {children}
        </AuthProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};
