import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

// extender todos os atributos que um input normal teria
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string; // tornar a tag name obrigatoria
  icon?: React.ComponentType<IconBaseProps>; // receber um componente como tipo e dentro desse componente ele vai ter os atributos que um componente do react-icons tem
  containerStyle?: object;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  containerStyle = {},
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null); // criar referencia para poder acessar o elemento
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // ! sempre que a gente altera um estado, propriedade, ou componente pai desse input ele vai ser renderizado(o componente é chamado de novo e toda função abaixo vai ser chamada tambem), tendo que resalvar as funções na memoria do zero.
  // ? agora sempre formas usar uma função dentro de um componente ela não pode ser criada diretamente, temos que usar um hook chamado useCallback que vai guardar a função na memoria e ela só vai ser atualizada quando quisermos
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // se o conteudo do input não estiver vazio vai ser true, se o value estiver vazio vai ser false.
    setIsFilled(!!inputRef.current?.value);
  }, []); // só vai recriar a função se passarmos alguma variavel dentro do array de dependencias que nem utilizamos com o useEffect

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName, // o unform as vezes altera o nome do campo entao vamos usar o fieldName que ele gera
      ref: inputRef.current, // referencia do elemento
      path: 'value', // quando precisar acessar o valor do input é só buscar no .value
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      data-testid="input-container"
    >
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
