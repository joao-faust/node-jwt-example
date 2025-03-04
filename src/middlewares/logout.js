import getRedisClient from '../getRedisClient.js'

/**
 * Authorize user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction}
 */
export default async function logout(req, res, next) {
    const redisClient = await getRedisClient()

    if (!redisClient.isReady) {
        return res.status(500).send({ message: 'Client is not ready.' })
    }

    const authorization = req.headers['authorization']

    const [flag, jwToken] = authorization.split(' ')

    if (flag !== 'Bearer') {
        return res.status(400).send({ message: 'Bearer flag is not present.' })
    }

    if (!jwToken) {
        return res.status(401).send({ message: 'Token is required.' })
    }

    let jwTokenBlacklistArray

    const jwTokenBlacklistJson = await redisClient.get('jwtBlacklist')

    if (!jwTokenBlacklistJson) {
        jwTokenBlacklistArray = []
    }
    else {
        jwTokenBlacklistArray = Array.from(JSON.parse(jwTokenBlacklistJson))
    }

    jwTokenBlacklistArray.push(jwToken)

    const jwtBlacklistAddResult = await redisClient.set(
        'jwtBlacklist',
        JSON.stringify(jwTokenBlacklistArray),
        parseInt(process.env.JWTOKEN_EXPIRES_IN)
    )

    if (!jwtBlacklistAddResult || jwtBlacklistAddResult !== 'OK') {
        return res.status(500).send({ message: 'Error logging out the user.' })
    }

    return res.send({ message: 'The user has been logged out.' })
}
