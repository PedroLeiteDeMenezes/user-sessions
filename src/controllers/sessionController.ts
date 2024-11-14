import { Request, Response } from 'express';
import sessionValidate from '../validations/sessionsValidations';
import jsonwentoken from 'jsonwebtoken'

class sessionController {
  public static async loginUser(req: Request, res:Response):Promise<any>{
    const {email, password} = req.body
    console.log(req.body);
    
    const {user, session, errors} = await sessionValidate.login(req.body)
    if (errors.length > 0) {
      return res.status(401).json({ errors });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jsonwentoken.sign({id: user.id, email: user.email}, process.env.TOKEN_SECRET ?? '', {
      expiresIn: '1h'
    })
    
    if(!session){
      await sessionValidate.createSession(user.id, token)
    }

    return res.status(201).json({
      message: 'Login successful',
      sessionToken: token
    })
  }
}

export default sessionController