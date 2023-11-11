import { db } from "@/lib/db";
import { gptSchemaBody } from "@/lib/validations/gpt";

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = gptSchemaBody.parse(json)
    let user = await db.user.findUnique({
      where: {
        email: body.email,
      }
    });

    if (!user) {
      user = await db.user.create({
        data: {
          email: body.email,
          gpts: {
            create: {
              url: body.url,
              name: body.name,
              description: body.description,
              imageUrl: body.imageUrl,
              tag: body.tag,
            },
          },
        },
      });
    } else {
      user = await db.user.update({
        where: {
          email: body.email,
        },
        data: {
          gpts: {
            create: {
              url: body.url,
              name: body.name,
              description: body.description,
              imageUrl: body.imageUrl,
              tag: body.tag,
            },
          },
        },
      });
    }

    return new Response(JSON.stringify(user));
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}