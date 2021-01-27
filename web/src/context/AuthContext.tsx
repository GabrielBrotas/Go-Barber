/*
  Quando precisamos passar variaveis/informações entre elementos que não tem comunicação direta entre si (ex: header e footer) precisamos de uma store ou um context para criar essas informações acessiveis de forma global.
*/
// contexto de autenticação.
import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
}

// informação do usuario que está logado.
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// forma de isolar o contexto de autenticação
const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    // verificar se o usuario tem algum dado no local storage, caso tenha já vai autenticá-lo
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      // parse para transformar o stringify em JSON
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };