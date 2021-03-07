/*
  Brute Force = uma pessoa tenta fazer muitas requisições dentro de poucos segundos, tentando invadir a aplicação para descobrir a senha de alguem ou minierar algum dado
  Para resolver isso o Rate Limiter vai verificar a quantidade de requisições foram feitas de um ip e executar alguma ação a partir disso
*/
import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

// configuração do limter
const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimit',
  points: 5, // no máximo 5 requisições
  duration: 1, // dentro de 1 segundo
});
// neste caso só estamos limitando a quantidade de 5 requisições dentro de 1 s, porém, o ideal é verificar que se a tentativa for continua bloquear o usuario por 24h ou mais.

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new AppError('Too many request', 429);
  }
}
