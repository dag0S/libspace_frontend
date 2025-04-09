import { Role } from "@/src/shared/types";
import { z } from "zod";
import {
  createUserFormSchema,
  editUserFormSchema,
} from "../const/UserZodSchemes";

export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  avatarURL: string | null;
  role: Role;
}

export type UserEditionData = z.infer<typeof editUserFormSchema>;
export type UserCreationData = z.infer<typeof createUserFormSchema>;
