import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
//@ts-ignore
import authConfig from '../config/authSecret';  

export default async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'No token provided' });
  }

  // ['bearer', 'token']
  const parts = authHeader.split(' ');
  //@ts-ignore
  if(!parts.length === 2) {
   
    return response.status(401).json({ error: 'Token error' });
  }

  const [ scheme, token ] = parts;

  if(!/^Bearer$/i.test(scheme)){
    return response.status(401).json({ error: 'Token malformatted' });
  }
  //@ts-ignore
  jwt.verify(token, authConfig.secret, (err, decoded) => { 
    
    if (err) return response.status(401).json({ error: 'Token invalid' });
    //@ts-ignore
    request.userId = decoded.id; 
    
    return next();
  });
};
