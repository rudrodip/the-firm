'use client'

import {
  Card,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import Image from "next/image";
import { GPT } from "@prisma/client";

type GptCardProps = {
  gpt: GPT;
};

export default function GptCard({ gpt }: GptCardProps) {
  return (
    <Link color="foreground" href={gpt.url} target="_blank">
      <Card isFooterBlurred radius="lg" className="border-none">
        <Image
          alt={gpt.name}
          className="object-cover opacity-90"
          height={400}
          src={gpt.imageUrl}
          width={400}
        />
        <p className="absolute right-3 top-3 p-1 rounded-md border backdrop-blur-md bg-secondary/50">{gpt.tag}</p>
        <CardFooter className="flex-col justify-between bg-secondary/30 border-white/20 text-secondary-foreground/70 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <h4 className="text-center font-heading text-2xl">{gpt.name}</h4>
          <Divider />
          <p className="text-center text-tiny">{gpt.description}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
