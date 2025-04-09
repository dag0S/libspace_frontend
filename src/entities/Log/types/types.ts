import { MethodsHTTP } from "@/src/shared/types";

export interface ILog {
  id: string;
  createdAt: Date;
  userId: string;
  action: string;
  methodHTTP: MethodsHTTP;
}
