import { Request, Response } from 'express';

import User from '../database/models/User'

// obs1: não estou validando se já existe uma conta criada com mesmos dados
// obs2: não gerando token ao criar conta (mas apenas ao logar)
// obs3: não relacionando user e communications

class UserController {
  async store(request: Request, response: Response) {
    try {
      const user = await User.create(request.body);

      user.password = undefined;

      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({ error: "Registration failed" })
    }

  }
}

export default UserController;