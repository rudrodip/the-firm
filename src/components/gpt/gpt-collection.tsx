import { getGpts } from "@/lib/utils";
import GptGrid from "./gpt-search";

export async function GptCollection() {
  const gpts = await getGpts();
  return (
    <>
      <GptGrid gpts={gpts} />
    </>
  );
}
