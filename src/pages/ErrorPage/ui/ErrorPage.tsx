"use client";

import { FC, useEffect } from "react";

import { Button } from "@/src/shared/shadcn";

const ErrorPage: FC<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-center">{error.message || "Что-то пошло не так!"}</h2>
      <Button onClick={() => reset()}>Обновить</Button>
    </div>
  );
};

export default ErrorPage;
