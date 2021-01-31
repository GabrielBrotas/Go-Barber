import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

const SignIn : React.FC =  () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null); // acessar as propriedades do elemento sem que um evento direto aconteca

  const handleSignIn = useCallback((data: object) => {
    console.log(data)
  }, [])

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === "ios" ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled" // quando clicar fora ele fechar o teclado
          contentContainerStyle={{ flex: 1}}
        >
          <Container>
            <Image source={logoImg} />

            {/* Como os textos não tem animação de subir e descer quando o keyboardAvoidingView acionar vamos colocar o View para animar a view e o texto consequentemente vai junto */}
            <View>
              <Title>Faça seu Logon</Title>
            </View>

            <Form onSubmit={handleSignIn} ref={formRef} style={{width: '100%'}}>

              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send" // botao que ficar no final do teclado, 'return', 'send' ...
                onSubmitEditing={ () =>
                  formRef.current?.submitForm()
                } // função que vai executar ao clicar no send
              />

              <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
              >
                Entrar
              </Button>
            </Form>

            <ForgotPassword onPress={() => console.log('a')}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  )
}

export default SignIn;
