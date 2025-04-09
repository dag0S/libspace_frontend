import { Role } from "@/src/shared/types";
import { z } from "zod";
import { createUserFormSchema } from "../const/createUserZodSchema";

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

export interface UserEditionData {
  email: string;
  firstName: string;
  lastName: string;
  newPassword: string;
  avatarURL: string | null;
  role: Role;
}

export type UserCreationData = z.infer<typeof createUserFormSchema>;
