import React, { useContext } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

import { AppContext } from '../../state';

import Paper from '../common/Paper';
import Title from '../common/Title';

const User = () => {
  const { logout } = useAuth0();
  const {
    state: { user },
    actions: { removeUser },
  } = useContext(AppContext);

  const handleLogOut = () => {
    logout({ returnTo: window.location.origin });
    removeUser();
  };

  return (
    <Paper>
      <Wrapper>
        <Title left>{user?.name}</Title>
        <Contact>{user?.email}</Contact>
        <Button type="button" onClick={handleLogOut}>
          Log out
        </Button>
      </Wrapper>
    </Paper>
  );
};

const Wrapper = styled.div`
  padding: 32px;
`;

const Contact = styled.div`
  font-size: 18px;
  line-height: 24px;
  color: var(--secondary-color-50);
  margin: 8px 0 24px;
`;

const Button = styled.button`
  font-size: 16px;
  line-height: 18px;
  color: var(--accent-secondary-color);
  background-color: transparent;
  border: none;
  opacity: 0.75;
  transition: opacity 0.3s;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 1;
  }
`;

export default User;
