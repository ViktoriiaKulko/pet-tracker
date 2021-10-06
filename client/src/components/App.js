import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

import GlobalStyles from './GlobalStyles';
import Header from './Header';
import Home from './Home';
import Profile from './Profile';
import Pet from './Pet';
import Form from './Form';
import Loader from './common/Loader';
import UnknownPage from './UnknownPage';

const App = () => {
  const [visibleForm, setVisibleForm] = useState(null);
  const { isLoading, isAuthenticated } = useAuth0();

  // wait for auth0 user data
  if (isLoading)
    return (
      <>
        <GlobalStyles />
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      </>
    );

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header setVisibleForm={setVisibleForm} />

      <Main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/profile">
            {isAuthenticated ? <Profile /> : <Redirect to="/" />}
          </Route>

          <Route path="/pet/:_id/:action">
            <Pet />
          </Route>

          <Route path="">
            <UnknownPage />
          </Route>
        </Switch>
      </Main>

      {visibleForm && <Overlay />}
      <Form visibleForm={visibleForm} setVisibleForm={setVisibleForm} />
    </BrowserRouter>
  );
};

const LoaderContainer = styled.div`
  margin: auto;
`;

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
