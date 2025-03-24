import { z } from "zod";

import { loginFormSchema, registerFormSchema } from "../const/authZodSchemes";

export type Login = z.infer<typeof loginFormSchema>;
export type Register = z.infer<typeof registerFormSchema>;
