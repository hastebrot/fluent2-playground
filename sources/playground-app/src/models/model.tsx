// zod model using spec-user-model.md with imports and types.
import { z } from "zod";

export type User = z.infer<typeof User>;
export const User = z.object({
  name: z.string(),
  age: z.number().optional(),
});
