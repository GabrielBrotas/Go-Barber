import React, { useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core'

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string; // nome do icone
};

interface InputValueReference {
  value: string;
};

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue}); // para ter acesso ao inputText

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      // quando o form quiser mudar o valor dos campos vai chamar essa função
      setValue(ref: any, value) {
        inputValueRef.current.value = value; // não altera visualmente o valor da referencia
        inputElementRef.current.setNativeProps({
          text: value
        }) // responsável por mudar visualmente o texto que está dentro do input
      },
      // o que vai acontecer com o input quando o unform precisar limpar o conteudo
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      }
    })
  }, [fieldName, registerField])

  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />

      <TextInput
      keyboardAppearance="dark"
      placeholderTextColor="#666360"
      defaultValue={defaultValue}
      onChangeText={value => {
        inputValueRef.current.value = value;
      }}
        {...rest}
      />
    </Container>
  )
}

export default Input
