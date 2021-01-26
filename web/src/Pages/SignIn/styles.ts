import styled from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center; // mesma coisa que usar o justifycontent e alignitems center juntos, tanto eixo horizontal quanto vertical
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    input {
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;
      color: #f4ede8;

      // o input que tiver outro antecedendo vai ter essa estilização
      & + input {
        margin-top: 8px;
      }

      &::placeholder {
        color: #666360;
      }
    }

    button {
      background: #ff9000;
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;
      color: #312e38;

      &:hover {
        background: ${shade(0.2, '#ff9000')};
      }
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  // esse > faz a verificação se o 'a' está apenas no primeiro nível do Content, se não o estilo vai prejudicar o 'a' do form
  > a {
    color: #ff9000;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  flex: 1; // ocupar todo espaço menos os 700px do Content
  background: url(${signInBackgroundImg});
  background-size: cover;
`;
