import React from 'react';
import { FiLock, FiArrowLeft, FiUser, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web'; // O Form vai monitorar o elementos input dentro dele e pegar os valores sem precisar criar estados, isso vai ajudar da performance pois no estado sempre que o valor é alterado o componente tem que ser renderizado novamente.

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {

  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Container> 
      <Background />

      <Content>
        <img src={logoImg} alt="logo" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="criar">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
