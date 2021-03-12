import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// como a interface não teria nada dentro, vamos criar ela em forma de type para puxar os atributos de um button
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
