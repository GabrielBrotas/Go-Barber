import {Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../config/auth'

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
  // pegar o token do header

  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new Error("JWT token is missing")
  }

  // Bearer asdhksau, pegar apenas o token e ignorar o Bearer
  const [ , token] = authHeader.split(' ');

  try {
    // verificar se o token do usuario é um token valido
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    // depois que esse middleware for executado uma vez, todas as rotas que forem autenticadas vao ter acesso ao user dentro do request
    request.user = {
      id: sub,
    }

    return next()
  } catch(err) {
    throw new Error("Invalid JWT token")
  }
}
