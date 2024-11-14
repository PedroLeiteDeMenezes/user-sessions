import User from '../models/user';
import SessionUser from '../models/userSession';

export default class sessionValidate{
  static async login(data:any): Promise<any>{
    const errors: string [] = []
    const {email, password} = data

    if(!password){
      errors.push('Password is required')
    }

    const user = await User.findOne({where: {email: email}})

    if(!user){
      errors.push('Invalid email')
      return errors
    }

    const session = await SessionUser.findOne({ where: { userId: user.id } });

    console.log(session);

    return {user, session, errors}
    }

  static async createSession(userId: number, sessionToken: string){
    const session = await SessionUser.create({
      userId: userId,
      sessionToken: sessionToken,
      expiresAt: new Date(Date.now() + 3600000),
    })

    console.log('Session created:', session);

  }
}
