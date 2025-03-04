import { Router } from 'express'
import authenticate from './middlewares/authenticate.js'
import authorize from './middlewares/authorize.js'
import admin from './middlewares/admin.js'
import logout from './middlewares/logout.js'

const router = Router()

router.post('/authenticate', authenticate)

router.get('/admin', authorize, admin)

router.get('/logout', authorize, logout)

export default router
