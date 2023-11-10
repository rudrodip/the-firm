"use client";

import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { gptSchema as FormSchema } from "@/lib/validations/gpt";
import { toast } from "sonner";
import { env } from "@env.mjs";

export default function SubmissionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control, reset, formState } = useForm<
    z.infer<typeof FormSchema>
  >({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    fetch(`${env.NEXT_PUBLIC_APP_URL}/api/gpt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.ok) {
          reset();
          toast.success("Your GPT has been submitted successfully!")
        } else {
          const error = await res.json();
          toast.error(error.message);
        }
      })
      .catch((err) => {
        toast.error('This GPT is already submitted!');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <section className="my-5 lg:my-12 mx-1 w-full flex flex-col items-center">
      <h1 className="text-center font-heading text-5xl">Submit your GPT</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-full lg:w-4/5">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 items-center">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                isRequired
                type="email"
                label="Email"
                errorMessage={
                  formState.errors.email && formState.errors.email.message
                }
                {...field}
              />
            )}
          />
          <Controller
            name="url"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                isRequired
                type="url"
                label="GPT URL"
                errorMessage={
                  formState.errors.url && formState.errors.url.message
                }
                placeholder="https://chat.openai.com/g/g-..."
                {...field}
              />
            )}
          />
          <Button type="submit" color="primary" size="lg" isLoading={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
}
