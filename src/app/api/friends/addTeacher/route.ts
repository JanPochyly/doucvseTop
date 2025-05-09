import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";

import { ZodError } from "zod";
import { db } from "@/lib/dbR";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendValidator.parse(body.email);

    const idToAddRaw = await fetchRedis('get', `user:email:${emailToAdd}`)

    const idToAdd = JSON.parse(idToAddRaw)

    if (!idToAdd) {
      return new Response("This person does not exist", { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (idToAdd === session.user.id) {
      return new Response("you cannot add yourself", { status: 400 });
    }

    const isAlreadyAdded = (await fetchRedis(
      "sismember",
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    )) as 0 | 1;


    const isMyFriend = (await fetchRedis(
      "sismember",
      `user:${idToAdd}:friends`,
      session.user.id
    )) as 0 | 1;

    const isAlreadyFriends = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    )) as 0 | 1;

    
    await pusherServer.trigger(
    toPusherKey(`user:${idToAdd}:incoming_friend_requests`),
      'incoming_friend_requests',
      {
        senderId: session.user.id,
        senderEmail: session.user.email,
      }
    )
    if (!isAlreadyAdded && !isAlreadyFriends) {
      db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);
    }
    if (!isMyFriend) {
      db.sadd(`user:${session.user.id}:friends`, idToAdd);  
    }

    return new Response("OK");
  } catch (error) {
    console.log("error")
    if (error instanceof ZodError) {
      return new Response("Invalid request error", { status: 422 });
    }

    return new Response("Invalid request", { status: 400 });
  }
}
