import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

import { AppContext } from '../../state';

import Icon from '../common/Icon';
import AddIcon from '../icons/AddIcon';

const Controls = ({ setVisibleForm }) => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  const {
    actions: { setUser },
  } = useContext(AppContext);

  useEffect(() => {
    if (isAuthenticated) {
      setUser({
        user: {
          name: user.given_name,
          email: user.email,
        },
      });
    } else {
      setUser({ user: null });
    }
  }, [isAuthenticated]);

  return (
    <StyledControls>
      {isAuthenticated ? (
        <>
          <UserName to="/profile">{user.given_name}</UserName>
          <Button type="button" onClick={() => setVisibleForm(true)}>
            <Icon>
              <AddIcon />
            </Icon>
          </Button>
        </>
      ) : (
        <AuthButton onClick={() => loginWithRedirect()}>Log In</AuthButton>
      )}
    </StyledControls>
  );
};

const StyledControls = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  border: 1px solid var(--secondary-color-12);
  border-radius: 100px;
  padding: 0 16px;
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

const UserName = styled(Link)`
  font-size: 14px;
  line-height: 20px;
  color: var(--secondary-color-50);
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: var(--secondary-color);
  }
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
  margin-right: -4px;

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
