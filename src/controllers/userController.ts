import { Request, Response } from 'express';
import validateUser from '../validations/userValidations';
import bcrypt from 'bcryptjs'
import User from '../models/user';

export default class UserController {
  public static async post(req: Request, res: Response):Promise<any>{
    try{
      const {firstName, lastName, email, password} = req.body

      const validator = new validateUser()
      const errors = await validator.createValidation(req.body)
      
      if(errors.length > 0){
        return res.status(400).json({errors})
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = await User.create({
        firstName: String(firstName),
        lastName: String(lastName),
        email: String(email),
        password_hash: hashedPassword,
      })
      
      return res.status(201).json(newUser)
    }catch(error: any){
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: error.message });
    }
  }
}