"use client";

import { Button, Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { gpt } from "@/types";

const FormSchema = z.object({
  query: z.string().min(1, {
    message: "Search query must be atleast 1 character long",
  }),
});

export default function GptGrid({ gpts }: { gpts: gpt[] }) {
  const {
    handleSubmit,
    control,
    formState: { errors, isLoading },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data)
  };
  return (
    <section id="explore" className="flex flex-col my-24 items-center">
      <h1 className="font-heading text-5xl text-center">Explore GPTs</h1>
      {/* <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-1/2 mt-4">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 items-center">
          <Controller
            name="query"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                isRequired
                type="text"
                label="Search"
                errorMessage={errors.query && errors.query.message}
                {...field}
              />
            )}
          />
          <Button type="submit" color="primary" size="lg" isLoading={isLoading}>
            Search
          </Button>
        </div>
      </form> */}
    </section>
  );
}
