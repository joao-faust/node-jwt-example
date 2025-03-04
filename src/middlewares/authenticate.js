import jwt from 'jsonwebtoken'

/**
 * Authenticate user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export default function authenticate(req, res) {
    const { username, password } = req.body

    if (username !== 'admin' || password !== 'admin') {
        return res.status(400).send({ message: 'Invalid credentials.' })
    }

    const token = jwt.sign(
        { sub: 1, name: 'admin' },
        process.env.JWTOKEN_SECRET,
        { expiresIn: parseInt(process.env.JWTOKEN_EXPIRES_IN) }
    )

    return res.send({ token })
}
