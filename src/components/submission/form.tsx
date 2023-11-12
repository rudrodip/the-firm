"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Avatar,
  Card,
  Select,
  SelectItem,
  Divider,
} from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { gptSchema as FormSchema } from "@/lib/validations/gpt";
import { toast } from "sonner";
import { env } from "@env.mjs";
import { categories } from "@/config/categories";

export default function SubmissionFormModal( props: { onOpenChange: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control, reset, formState, getValues, trigger, watch } = useForm<
    z.infer<typeof FormSchema>
  >({
    resolver: zodResolver(FormSchema),
  });

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const validateGptUrl = async () => {
    // Trigger validation for "email" and "url" fields
    const emailValidationResult = await trigger("email");
    const urlValidationResult = await trigger("url");
  
    if (emailValidationResult && urlValidationResult) {
      // Both "email" and "url" are valid
      setIsLoading(true);
      fetch(`${env.NEXT_PUBLIC_APP_URL}/api/gpt-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: getValues("url") }),
      })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            setTitle(data.title);
            setDescription(data.description);
            setImageUrl(data.image);
            setIsValid(true);
          }
        })
        .catch((err) => {
          toast.error("Error fetching GPT data! Check your URL and try again.");
        })
        .finally(() => setIsLoading(false));
    } else {
      toast.error("Please check your input.");
    }
  };  

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    fetch(`${env.NEXT_PUBLIC_APP_URL}/api/gpt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        name: title,
        description,
        imageUrl: imageUrl,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          reset();
          toast.success("Your GPT has been submitted successfully!");
        } else {
          const error = await res.json();
          toast.error(error.message);
        }
      })
      .catch((err) => {
        toast.error("This GPT is already submitted!");
      })
      .finally(() => {
        setIsLoading(false)
        props.onOpenChange()
      });
  };

  return (
    <section className="my-5 lg:my-12 mx-1 w-full flex flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-full lg:w-4/5">
        <div className="flex flex-col w-full gap-4 items-center">
          <Avatar src={imageUrl} className="w-20 h-20 text-large" />
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
          <Controller
            name="tag"
            control={control}
            defaultValue="General"
            render={({ field }) => (
              <Select
                isRequired
                label="Select category"
                className="max-w-xs"
                size="sm"
                {...field}
              >
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          {isValid && (
            <Card isBlurred radius="lg" className="border-none p-4 bg-primary">
              <h4 className="text-center font-heading text-2xl">{title}</h4>
              <Divider />
              <p className="text-center text-tiny">{description}</p>
            </Card>
          )}

          {!isValid && (
            <Button
              color="primary"
              isLoading={isLoading}
              onClick={() => validateGptUrl()}
            >
              Check
            </Button>
          )}
          {isValid && (
            <Button type="submit" color="primary" isLoading={isLoading}>
              Submit
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}
