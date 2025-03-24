import { useMeQuery } from "@/src/features/Auth/api/api";

export const useAuth = () => {
  const { data: user, isLoading } = useMeQuery();

  return { user, isLoading, isAuthenticated: !!user };
};
