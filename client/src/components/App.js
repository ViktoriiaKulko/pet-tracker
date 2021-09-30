import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import GlobalStyles from './GlobalStyles';
import Header from './Header';
import Home from './Home';
import Profile from './Profile';
import Pet from './Pet';
import Form from './Form';

const App = () => {
  const [visibleForm, setVisibleForm] = useState(false);

  const showForm = () => {
    setVisibleForm(true);
  };

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header showForm={showForm} />

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

      {visibleForm && (
        <>
          <Form />
          <Overlay />
        </>
      )}
    </BrowserRouter>
  );
};

const Main = styled.main`
  flex-grow: 1;
`;

// background for modal windows
const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--secondary-color-50);
`;

export default App;
