import { z } from "zod";

export const UserInputSchema = z.object({
  birthDate: z.string()
    .regex(/^\d{2}\/\d{4}$/, "Birth date must be in MM/YYYY format")
    .refine(
      (val) => {
        const [month, year] = val.split("/").map(Number);
        return month >= 1 && month <= 12 && year > 1900 && year <= new Date().getFullYear();
      }, 
      { message: "Invalid birth date" }
    ),
  monthlyGrossIncome: z.number()
    .min(0, "Income must be a positive number")
    .max(1000000, "Income seems unrealistically high"),
  effectiveDate: z.string(),
  shouldStoreInput: z.boolean().default(false)
});

export type UserInputType = z.infer<typeof UserInputSchema>;

export const validateUserInput = (data: Partial<UserInputType>) => {
  return UserInputSchema.safeParse(data);
};
