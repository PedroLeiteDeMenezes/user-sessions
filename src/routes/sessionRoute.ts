import { Router } from 'express';

import sessionController from '../controllers/sessionController';

const router = Router()

router.post('/', sessionController.loginUser)

export default router