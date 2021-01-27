import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string; // nosso Tooltip vai precisar desse className pois o styled components faz a estilização atraves de classes e, como o Tooltip está sendo filho de uma estilização do Error ele vai precisar desse atributo
}

const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
