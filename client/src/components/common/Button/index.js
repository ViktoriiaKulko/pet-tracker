import React from 'react';
import styled from 'styled-components';

const Button = ({ type = 'button', disabled, handleClick, children }) => {
  return (
    <StyledButton type={type} disabled={disabled} onClick={handleClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: 100%;
  height: 48px;
  font-size: 16px;
  line-height: 24px;
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
`;

export default Button;
