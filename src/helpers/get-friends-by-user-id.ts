import { fetchRedis } from "./redis"

export const getFriendsByUserId = async (userId: string) => {
  const friendIds = await fetchRedis('smembers', `user:${userId}:friends`) as string[]
  
  const friends = await Promise.all(
    friendIds.map(async (friendId) => {
      const friend = await fetchRedis('get', `user:${friendId}`) as string
      const parseFriend = JSON.parse(friend)
      return parseFriend
    })
  )

  return friends
}