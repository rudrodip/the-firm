import * as z from "zod";

export const gptUrlSchema = z.object({
  url: z
    .string()
    .url()
    .refine((url) => url.includes("chat.openai.com/g/g-"), {
      message: "URL must include 'chat.openai.com/g/g-'",
    }),
});
