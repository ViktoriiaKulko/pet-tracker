import React from 'react';
import styled from 'styled-components';

const Button = ({ height, type = 'button', handleClick, children }) => {
  return (
    <Wrapper height={height} type={type} onClick={handleClick}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  width: 100%;
  height: ${(props) => (props.height ? `${props.height}px` : '48px')};
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
`;

export default Button;
