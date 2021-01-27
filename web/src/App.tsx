import React from 'react';

import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <SignUp />
      <GlobalStyle />
    </>
  );
};

export default App;
