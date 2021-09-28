import React from 'react';
import styled, { css } from 'styled-components';

const Chip = ({ selected, handleClick, children }) => {
  return (
    <Wrapper selected={selected} type="button" onClick={handleClick}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  flex: 1;
  height: 40px;
  font-size: 16px;
  line-height: 38px;
  border: 1px solid transparent;
  border-radius: 100px;
  transition: all 0.3s;
  /* dynamically computed  */
  color: ${(props) =>
    props.selected ? 'var(--primary-color)' : 'var(--secondary-color-50)'};
  background-color: ${(props) =>
    props.selected ? 'var(--accent-primary-color)' : 'transparent'};
  border-color: ${(props) =>
    props.selected
      ? 'var(--accent-primary-color)'
      : 'var(--secondary-color-50)'};
  cursor: ${(props) => (props.selected ? 'default' : 'pointer')};

  ${(props) =>
    !props.selected &&
    css`
      &:hover {
        border-color: var(--accent-primary-color);
      }
    `}
`;

export default Chip;
