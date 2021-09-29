import React from 'react';
import styled from 'styled-components';

const Chip = ({ selected, handleClick, children }) => {
  return (
    <StyledChip selected={selected} type="button" onClick={handleClick}>
      {children}
    </StyledChip>
  );
};

const ChipOutline = ({ selected, handleClick, children }) => {
  return (
    <StyledChipOutline selected={selected} type="button" onClick={handleClick}>
      {children}
    </StyledChipOutline>
  );
};

const StyledChip = styled.button`
  height: 40px;
  font-size: 16px;
  line-height: 38px;
  color: ${(props) =>
    props.selected ? 'var(--primary-color)' : 'var(--secondary-color-50)'};
  background-color: ${(props) =>
    props.selected ? 'var(--accent-primary-color)' : 'transparent'};
  border: 1px solid transparent;
  border-color: ${(props) =>
    props.selected
      ? 'var(--accent-primary-color)'
      : 'var(--secondary-color-50)'};
  border-radius: 100px;
  transition: all 0.3s;
  cursor: pointer;
  pointer-events: ${(props) => (props.selected ? 'none' : 'auto')};
  padding: 0 16px;

  &:hover {
    border-color: var(--accent-primary-color);
  }
`;

const StyledChipOutline = styled(StyledChip)`
  color: ${(props) =>
    props.selected ? 'var(--secondary-color)' : 'var(--secondary-color-50)'};
  background-color: transparent;
  border-color: ${(props) =>
    props.selected ? 'var(--secondary-color)' : 'var(--secondary-color-50)'};

  &:hover {
    color: var(--secondary-color);
    border-color: var(--secondary-color-50);
  }
`;

export { Chip, ChipOutline };
