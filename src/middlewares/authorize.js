import jwt from 'jsonwebtoken'
import getRedisClient from '../getRedisClient.js'

/**
 * Authorize user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction}
 */
export default async function authorize(req, res, next) {
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

    try {
        const decoded = jwt.verify(jwToken, process.env.JWTOKEN_SECRET)

        const jwTokenBlacklistJson = await redisClient.get('jwtBlacklist')

        if (!jwTokenBlacklistJson) {
            return next()
        }

        const jwTokenBlacklistArray = Array.from(JSON.parse(jwTokenBlacklistJson))

        if (jwTokenBlacklistArray.indexOf(jwToken) !== -1) {
            return res.status(401).send({ message: 'Token is in blacklist.' })
        }

        res.locals.id = decoded.sub
        res.locals.name = decoded.name

        return next()
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).send({ message: 'Access danied.' })
        }

        return res.status(500).send({ message: 'Error decoding the token.' })
    }
}
