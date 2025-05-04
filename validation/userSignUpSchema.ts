import { z } from "zod";

export const userSignUpSchema = z.object({
  email: z.string().email("invalidEmail"),
  password: z
    .string()
    .min(8, "minPassword")
    .regex(/[A-Z]/, "passwordUpper")
    .regex(/[a-z]/, "passwordLower")
    .regex(/[0-9]/, "passwordDigit")
    .regex(/[!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|]/, "passwordSymbol")
    .refine((val) => !/\s/.test(val), { message: "passwordNoSpaces" }),
  first_name: z.string().min(1, "firstNameRequired"),
  last_name: z.string().min(1, "lastNameRequired"),
  office_id: z.number({ invalid_type_error: "selectOffice" }),
  office_role_id: z.number({ invalid_type_error: "selectRole" }),
});
