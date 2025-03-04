import redis from 'redis'

/**
 * @returns {Promise<redis.RedisClientType>}
 */
export default async function getRedisClient() {
    if (!global.redisClient) {
        global.redisClient = await redis.createClient()
            .on('error', error => console.log('Redis Client Error', error))
            .connect()
    }

    return global.redisClient
}

