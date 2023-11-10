import { env } from "@env.mjs";
import GptCard from "./gpt-card";
import { gpt } from "@/types";

export async function GptCollection() {
  const gpts: gpt[] = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/gpt`).then(
    (res) => res.json()
  );
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
