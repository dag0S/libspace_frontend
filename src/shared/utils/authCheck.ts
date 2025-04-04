"use server";

import { cookies } from "next/headers";

import { JWT_ACCESS_TOKEN } from "../constant";
import { ResponseUserDate } from "@/src/features/Auth";

export const authCheck = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  if (!token) {
    return { isAuthenticated: false, user: null };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    headers: {
      cookie: `${JWT_ACCESS_TOKEN}=${token}`,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    return { isAuthenticated: false, user: null };
  }

  const user: ResponseUserDate = await res.json();
  
  return { isAuthenticated: true, user };
};
