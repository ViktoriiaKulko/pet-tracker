import React from 'react';
import styled, { keyframes } from 'styled-components';

import Icon from '../Icon';
import LoaderIcon from '../../icons/LoaderIcon';

const Button = ({
  type = 'button',
  disabled,
  loading,
  handleClick,
  children,
}) => {
  return (
    <StyledButton
      className={loading ? 'loading' : ''}
      type={type}
      disabled={disabled}
      onClick={handleClick}
    >
      {loading ? (
        <Loader>
          <Icon>
            <LoaderIcon />
          </Icon>
        </Loader>
      ) : (
        <>{children}</>
      )}
    </StyledButton>
  );
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledButton = styled.button`
  width: 100%;
  height: 48px;
  font-size: 16px;
  color: var(--primary-color);
  background-color: var(--accent-primary-color);
  border: 1px solid transparent;
  border-radius: 8px;
  transition: transform 0.3s;
  cursor: pointer;
  padding: 0 12px;

  &:hover {
    transform: scale(1.01);
  }

  &:active {
    transform: scale(1);
  }

  &:disabled {
    background-color: var(--neutral-color-300);
    pointer-events: none;
  }

  &.loading {
    pointer-events: none;
  }
`;

const Loader = styled.div`
  line-height: 0;
  animation: ${spin} 2s linear infinite;
`;

export default Button;
