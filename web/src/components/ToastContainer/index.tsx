import React from 'react';
import { useTransition } from 'react-spring'; // lidar com animações de objetos
import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id, // retorna a informação unica da mensage,
    {
      // estilização
      from: {
        right: '-120%', // posição inicial da mensagem
        opacity: 0,
      },
      enter: {
        right: '0%', // posição do right quando o elemento entrar em tela
        opacity: 1,
      },
      leave: {
        right: '-120%', // estilização quando sair de tela
        opacity: 0,
      },
    },
  );

  return (
    <Container>
      {/* item é a 'message', key é o id unico e props é os styles gerado  */}
      {messagesWithTransitions.map(({ item, key, props }) => (
        // como nossos toasts pode ser adicionado mais de um e tem pode ser removido também, para não ter que ficar fazendo comparações dentro desse container para todo array de toast nós vamos isolar o Toast em um componente e cada um vai lidar com seu estado, se ainda está visivel ou se já foi removido, etc...
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
