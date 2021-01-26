import React, { InputHTMLAttributes } from 'react'
import { IconBaseProps } from 'react-icons'

import { Container } from './styles'

// extender todos os atributos que um input normal teria
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string; // tornar a tag name obrigatoria
  icon: React.ComponentType<IconBaseProps>; // receber um componente como tipo e dentro desse componente ele vai ter os atributos que um componente do react-icons tem
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest}) => (
  <Container>
    { Icon && <Icon size={20} />}
    <input {...rest} />
  </Container>
)

export default Input;
