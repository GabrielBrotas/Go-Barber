import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

// * criou a função aqui para todos os testes terem acesso a essa função
const mockedHistoryPush = jest.fn(); // jest.fn() vai criar uma função vazia, só para saber que foi chamada, mockReturnValue vai dizer o que vai conter nessa função
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

// * criar o mock aqui pois todos os testes vão utilizar o mesmo mock
jest.mock('react-router-dom', () => {
  // quando o react router dom for chamado queremos que ele retorne esses valores...
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

// temos que fazer um mock para todas as funções que façam uma requisição externa ou bibliotecas externas, para não depender da api e para testar o componente de forma visual, vamos simular ações apenas para que o metodo funcione e que o código prossiga,
// * neste caso como estamos testando a tela de sign in não tem porque testar o hook de autenticação aqui
jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

// categoria do teste, neste caso que é da page do signIn
describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear(); // limpar a função
  });

  it('should be able to sign in', async () => {
    // o render retorna varias sintaxes, o debug é um console log de vários elementos
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Password');
    const buttonElement = getByText('Entrar');

    // fireEvent pode disparar ações de um usuário
    // como o valor de um campo é pego atraves o e.target.value não podemos passar o valor direto, passamos por esse objeto
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    // wait vai ficar executando o código até ele passar, depois de 3s se ele não executar a função vai falhar mesmo
    await waitFor(() => {
      // testar visualmente a aplicação, ignorando a parte logica por enquanto
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to sign in', async () => {
    // o render retorna varias sintaxes, o debug é um console log de vários elementos
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Password');
    const buttonElement = getByText('Entrar');

    // fireEvent pode disparar ações de um usuário
    // como o valor de um campo é pego atraves o e.target.value não podemos passar o valor direto, passamos por esse objeto
    fireEvent.change(emailField, {
      target: { vaue: 'not-valid-email@example.com' },
    });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    // wait vai ficar executando o código até ele passar, depois de 3s se ele não executar a função vai falhar mesmo
    await waitFor(() => {
      // testar visualmente a aplicação, ignorando a parte logica por enquanto
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if login fails', async () => {
    // simular um erro ficticio da api
    // mockImplementation vai sobrescrever o que a função faz
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    // o render retorna varias sintaxes, o debug é um console log de vários elementos
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Password');
    const buttonElement = getByText('Entrar');

    // fireEvent pode disparar ações de um usuário
    // como o valor de um campo é pego atraves o e.target.value não podemos passar o valor direto, passamos por esse objeto
    fireEvent.change(emailField, {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    // wait vai ficar executando o código até ele passar, depois de 3s se ele não executar a função vai falhar mesmo
    await waitFor(() => {
      // testar visualmente a aplicação, ignorando a parte logica por enquanto
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
