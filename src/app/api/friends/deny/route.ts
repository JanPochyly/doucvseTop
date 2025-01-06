import { authOptions } from "@/lib/auth";
import { db } from "@/lib/dbR";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id: idToDeny } = z.object({ id: z.string() }).parse(body);

    await pusherServer.trigger(toPusherKey(
      `user:${session.user.id}:friendRequestDeny`),
      "friendRequestDeny",
      {
        id: idToDeny,
      }
    );
    await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToDeny);
    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }
    console.log("error: " + error);
    return new Response("Invalid request", { status: 400 });
  }
}
