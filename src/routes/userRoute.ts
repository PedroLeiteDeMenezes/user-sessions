 import { Router } from 'express';


 import UserController from '../controllers/userController'


 const router = Router()

 router.post('/', UserController.post)


 export default router