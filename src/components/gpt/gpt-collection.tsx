import { GPT, PrismaClient } from "@prisma/client";
import GptGrid from "./gpt-search";

export async function GptCollection() {
  const prisma = new PrismaClient();
  let gpts: GPT[] = [];
  try {
    gpts = await prisma.gPT.findMany();
  } catch (error) {
    console.error(error);
  }
  return (
    <>
      <GptGrid gpts={gpts} />
    </>
  );
}
