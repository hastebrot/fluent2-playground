# spec: User model.

general structure of a model.

```ts
import * as z from "zod";

export type User = z.infer<typeof User>;
export const User = z.object({
  // properties here.
});
```

model properties:
- name: string
- age: number optional
