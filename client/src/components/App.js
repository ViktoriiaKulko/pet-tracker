import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import GlobalStyles from './GlobalStyles';
import Header from './Header';
import Home from './Home';
import Profile from './Profile';
import Pet from './Pet';

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

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/pet/:id">
            <Pet />
          </Route>

          <Route path="">404: Oops!</Route>
        </Switch>
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.main`
  flex-grow: 1;
`;

export default App;
