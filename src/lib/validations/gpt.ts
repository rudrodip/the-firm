import * as z from "zod"

export const gptSchema = z.object({
  email: z.string().email(),
  url: z
    .string()
    .url()
    .refine((url) => url.includes("chat.openai.com/g/g-"), {
      message: "URL must include 'chat.openai.com/g/g-'",
    }),
});