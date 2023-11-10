import { db } from "@/lib/db";
import { gptSchema } from "@/lib/validations/gpt";
import { querySchema } from "@/lib/validations/search";

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = gptSchema.parse(json)
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


export async function GET(req: Request){
  try {
    let gpts = await db.gPT.findMany()

    return new Response(JSON.stringify(gpts));
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}