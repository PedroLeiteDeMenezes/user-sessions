import User from '../models/user';
import validator from 'validator';
import { IUser } from '../interface/IUser';

class validateUser implements IUser{
  public id?: number | undefined;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password_hash!: string;
  public password?: string | undefined;

  private validateEmail(email: string){
    return validator.isEmail(email)
  }

  async createValidation(data: any): Promise<any>{
    const errors: string[] = []

    if(!data.firstName || typeof data.firstName !== 'string'){
      errors.push('First name is required and must be a string')
    }

    if(!data.lastName || typeof data.lastName !== 'string'){
      errors.push('Last Name is required and must be a string.')
    }

    if(!data.email || typeof data.email !== 'string' || !this.validateEmail(data.email)){
      errors.push('A valid email is required')
    }

    if(!data.password || data.password.length < 6){
      errors.push('Password is required and must be at least 6 characters')
    }

    const userExist = await User.findOne({where: {email: data.email}})
    if(userExist){
      errors.push('A user with this email already exists')
    }
    
    return errors
  }
}

export default validateUser