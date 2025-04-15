import { Router } from 'express'
import { register, login } from '../controllers/auth.controller'
import { validateSchema } from '../middlewares/validateSchema'
import { registerSchema, loginSchema } from '../schemas/authSchemas'

const router = Router()

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)

export default router
