import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "@env.mjs";
import { cache } from 'react'
import { PrismaClient } from "@prisma/client";

export const revalidate = 600

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const getGpts = cache(async () => {
  const prisma = new PrismaClient();
  const gpts = await prisma.gPT.findMany();
  return gpts
})