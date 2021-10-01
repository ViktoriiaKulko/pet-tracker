import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

import Icon from '../common/Icon';
import AddIcon from '../icons/AddIcon';

const Controls = ({ showForm }) => {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated } = useAuth0();

  console.log('user', user);

  return (
    <StyledControls>
      {isAuthenticated ? (
        <UserName>{user.given_name}</UserName>
      ) : (
        <AuthButton onClick={() => loginWithRedirect()}>Log In</AuthButton>
      )}
      <Button type="button" onClick={showForm}>
        <Icon>
          <AddIcon />
        </Icon>
      </Button>

      {/* TODO: create a log out button */}
      {/* <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button> */}
    </StyledControls>
  );
};

const StyledControls = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  border: 1px solid var(--secondary-color-12);
  border-radius: 100px;
  padding-left: 16px;
  padding-right: 12px;
`;

const AuthButton = styled.button`
  font-size: 14px;
  line-height: 20px;
  color: var(--secondary-color-50);
  background-color: transparent;
  border: none;
  transition: color 0.3s;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: var(--secondary-color);
  }
`;

const UserName = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: var(--secondary-color-50);
`;

const Button = styled.button`
  position: relative;
  font-size: 24px;
  line-height: 0;
  color: var(--accent-primary-color);
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 32px;

  & > div {
    transition: transform 0.3s;
  }

  &:hover {
    & > div {
      transform: scale(1.1);
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: -16px;
    top: 4px;
    width: 1px;
    height: 16px;
    background-color: var(--secondary-color-12);
  }
`;

export default Controls;
