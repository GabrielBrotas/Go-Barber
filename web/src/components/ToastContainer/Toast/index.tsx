import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';
import { ToastMessage, useToast } from '../../../hooks/toast';
import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  // disparar essa ação assim que o componente for exibido em tela
  useEffect(() => {
    // depois de 3 segundos é para remover este toast;
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      // caso o componente tenha sido destruido(unmounted) vamos remover o timer pois, se o componente já foi removido não faz sentido chamar função para remover um toast que já não existe mais.
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      key={message.id}
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
