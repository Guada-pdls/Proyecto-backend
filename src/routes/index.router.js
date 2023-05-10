import { Router } from 'express';
import api_router from './api/api.router.js';
import view_router from './views/views.router.js'

const router = Router()

router.use('/api', api_router)
router.use('/', view_router)

export default router