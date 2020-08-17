import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
//@ts-ignore
import authConfig from '../config/authSecret';


import User, { IUser } from '../database/models/User'

class AuthController {
  
  async store(request: Request, response: Response) {
    try {
      const { name, password } = request.body;

      const user = await User.findOne({ name }).select('+password');

      if(!user){
        return response.status(400).json({ error: "User not found" });
      }

      if(!await bcrypt.compare(password, user.password)){
        return response.status(400).json({ error: "Invalid password" });
      }
       //@ts-ignore
      user.password = undefined;

      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400
      });

      return response.json({ user, token });
    } catch (err) {
      return response.status(400).json({ error: "Authentication failed" })
    }

  }
}

export default AuthController;