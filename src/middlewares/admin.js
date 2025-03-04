import jwt from 'jsonwebtoken'

/**
 * Protected route
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction}
 */
export default function admin(req, res, next) {
    return res.send({ message: 'Welcome to the admin route!' })
}
