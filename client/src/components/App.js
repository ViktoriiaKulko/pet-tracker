import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import GlobalStyles from './GlobalStyles';
import Header from './Header';
import Home from './Home';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />

      <Main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.main`
  flex-grow: 1;
`;

export default App;
