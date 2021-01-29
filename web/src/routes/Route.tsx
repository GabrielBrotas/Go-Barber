import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

/*
  Condições de rota
  Rota privada && usuario autenticado = pode acessar;
  Rota privada && usuario não autenticado = mandar para login;
  Rota não privada && usuario autenticado = redirecionar para o dashboard;
  Rota não privada && usuario não autenticado = ok;
*/

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        // se a rota for privada e o user estiver autenticado ex: dashboard, ou se a rota não for privada e o user não estiver autenticado ex: login e register
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : 'dashboard',
              state: { from: location }, // passar o histórico de acesso
            }}
          />
        );
      }}
    />
  );
};

export default Route;
