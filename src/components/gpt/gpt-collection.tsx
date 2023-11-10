import GptCard from "./gpt-card";
import { GPT, PrismaClient } from "@prisma/client";

export async function GptCollection() {
  const prisma = new PrismaClient();
  let gpts: GPT[] = []
  try {
    gpts = await prisma.gPT.findMany()
  } catch (error) {
    console.error(error)
  }
  return (
    <>
      <section
        id="collection"
        className="mt-10 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {gpts.map((gpt, i) => {
          return <GptCard key={i} gpt={gpt} />;
        })}
      </section>
    </>
  );
}
