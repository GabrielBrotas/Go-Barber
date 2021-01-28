import React from 'react';

import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import GlobalStyle from './styles/global';

import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <>
      {/* o provider vai dizer quais rotas terão acesso a este context  */}
      <AppProvider>
        <SignIn />
      </AppProvider>

      <GlobalStyle />
    </>
  );
};

export default App;
