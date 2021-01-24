// nesse type, vamos sobrescrever a tipagem do Express para adicionar o user no request
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
