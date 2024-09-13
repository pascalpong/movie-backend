import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUser } from '../models/user.model';
import { findUserByEmail } from './user.service';

export class AuthService {

  public generateToken(user: IUser): string {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
  }

  public async validateUser(email: string, password: string): Promise<IUser> {
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
  
}