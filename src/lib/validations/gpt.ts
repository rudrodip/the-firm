import * as z from "zod"

export const gptSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  url: z
    .string()
    .url()
    .refine((url) => url.includes("chat.openai.com/g/g-"), {
      message: "URL must include 'chat.openai.com/g/g-'",
    }),
  tag: z.string().default('General'),
});

export const gptSchemaBody = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  url: z
    .string()
    .url()
    .refine((url) => url.includes("chat.openai.com/g/g-"), {
      message: "URL must include 'chat.openai.com/g/g-'",
    }),
  tag: z.string().default('General'),
  name: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().url(),
});