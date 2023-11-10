import {
  Card,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import Image from "next/image";
import { gpt } from "@/types";

type GptCardProps = {
  gpt: gpt;
};

export default async function GptCard({ gpt }: GptCardProps) {
  const htmlContent = await fetch(gpt.url)
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

  const title = titleMatch ? titleMatch[1] : "No title";
  const image = imageMatch ? imageMatch[1].replace(/&amp;/g, "&") : "/logo/main-logo.png";
  const description = descriptionMatch ? descriptionMatch[1] : "No description";

  return (
    <Link color="foreground" href={gpt.url} target="_blank">
      <Card isFooterBlurred radius="lg" className="border-none">
        <Image
          alt={title}
          className="object-cover opacity-90"
          height={400}
          src={image}
          width={400}
        />
        <CardFooter className="flex-col justify-between border-white/20 text-secondary-foreground/70 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <h4 className="text-center font-heading text-2xl">{title}</h4>
          <Divider />
          <p className="text-center text-tiny">{description}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
