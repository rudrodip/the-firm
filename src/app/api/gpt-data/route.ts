import { gptUrlSchema } from "@/lib/validations/search";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = gptUrlSchema.parse(json);
    const url = body.url;
    const htmlContent = await fetch(url)
      .then((res) => res.text())
      .catch((err) => console.error(err));

    const titleRegex =
      /<div class="text-center text-2xl font-medium">([^<]+)<\/div>/;
    const imageRegex =
      /<img\s+src="([^"]+)"\s+class="h-full w-full bg-token-surface-secondary dark:bg-token-surface-tertiary"\s+alt="GPT"\s+width="80"\s+height="80"\/>/;
    const descRegex =
      /<div class="max-w-md text-center text-xl font-normal text-token-text-secondary">([^<]+)<\/div>/;

    const titleMatch = htmlContent?.match(titleRegex);
    const imageMatch = htmlContent?.match(imageRegex);
    const descriptionMatch = htmlContent?.match(descRegex);

    const title = titleMatch?.[1];
    const image = imageMatch?.[1].replace(/&amp;/g, "&");
    const description = descriptionMatch?.[1];

    const gptData = {
      title,
      image,
      description,
    };

    return new Response(JSON.stringify(gptData));
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
