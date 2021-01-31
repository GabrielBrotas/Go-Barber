import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState, useCallback } from 'react';
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

interface InputRef {
  focus(): void // função que queremos dentro do ref
}

// a ref não é passada como qualquer outro parametro, ela é passada separadamente
// para podermos usar o ref do elementro precisamos usar o FowardRefRenderFunction que aceita o ref vindo do parametro e no primeiro parametro <> dele precisamos dizer qual o tipo de ref que vamos utilizar
const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue}); // para ter acesso ao inputText

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // verificar se o campo está preenchido
    setIsFilled(!!inputValueRef.current.value);
  }, [])

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }))

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
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon name={icon} size={20} color={isFocused || isFilled ? '#ff9000' : '#666360'} />

      <TextInput
      ref={inputElementRef}
      keyboardAppearance="dark"
      placeholderTextColor="#666360"
      defaultValue={defaultValue}
      onChangeText={value => {
        inputValueRef.current.value = value;
      }}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  )
}

export default forwardRef(Input);
