import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler'
import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string; // o children vem por padrao em todo React.FC, porém ele é opcional e pode ser qualquer coisa. Assim, estamos forcando ele para ser uma string e para ser obrigatório
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  // o container é o rect button então ele que recebe todos os dados
  <Container {...rest}>
    <ButtonText>
      {children}
    </ButtonText>
  </Container>
)

export default Button
