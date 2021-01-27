import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// como a interface não teria nada dentro, vamos criar ela em forma de type para puxar os atributos de um button
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
