import { config } from 'dotenv-safe'
config()
import express from 'express'
import router from './router.js'

const app = express()

const port = process.env.PORT

app.use('/', express.json())

app.use('/', router)

app.listen(port, async () => {
    console.log(`The server is running on port ${port}`)
})
