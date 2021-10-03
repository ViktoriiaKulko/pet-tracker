import React, { useState } from 'react';
import styled from 'styled-components';

import Icon from '../common/Icon';
import SearchIcon from '../icons/SearchIcon';

const Filters = () => {
  const [currentFilter, setCurrentFilter] = useState(0);

  return (
    <StyledFilters currentFilter={currentFilter}>
      <Tab
        selected={currentFilter === 0}
        type="button"
        onClick={() => setCurrentFilter(0)}
      >
        Found
      </Tab>

      <Tab
        selected={currentFilter === 1}
        type="button"
        onClick={() => setCurrentFilter(1)}
      >
        Lost
      </Tab>

      {/* TODO: Add animation, decide how to filter */}
      <Search>
        <Input type="text" placeholder="Filter" />
        <Button type="button">
          <Icon>
            <SearchIcon />
          </Icon>
        </Button>
      </Search>
    </StyledFilters>
  );
};

const StyledFilters = styled.div`
  height: 48px;
  position: relative;
  display: flex;
  border: 1px solid var(--secondary-color-12);
  border-radius: 100px;

  &::after {
    content: '';
    position: absolute;
    width: 160px;
    top: -1px;
    bottom: -1px;
    left: -1px;
    transform: ${(props) => `translateX(${props.currentFilter * 160}px)`};
    border: 1px solid var(--secondary-color);
    border-radius: 100px;
    transition: transform 0.3s;
  }
`;

const Tab = styled.button`
  position: relative;
  width: 160px;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) =>
    props.selected ? 'var(--secondary-color)' : 'var(--secondary-color-50)'};
  border: none;
  background-color: transparent;
  transition: color 0.3s;
  cursor: pointer;
  z-index: 2;
  pointer-events: ${(props) => (props.selected ? 'none' : 'auto')};
  padding: 0 20px;

  &:hover {
    color: var(--secondary-color);
  }
`;

const Search = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-right: 8px;
  padding-left: 16px;
  margin-left: 16px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 1px;
    height: 16px;
    background-color: var(--secondary-color-12);
  }
`;

const Input = styled.input`
  width: 92px;
  height: 40px;
  font-size: 14px;
  line-height: 20px;
  border: none;
  outline: none;
  caret-color: var(--accent-primary-color);
  margin-right: 8px;
`;

const Button = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 0;
  color: var(--primary-color);
  background-color: var(--accent-primary-color);
  border: none;
  border-radius: 50%;
`;

export default Filters;
