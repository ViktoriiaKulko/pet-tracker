import React from 'react';
import styled, { css } from 'styled-components';

import Icon from '../common/Icon';
import SearchIcon from '../icons/SearchIcon';

const Filters = () => {
  return (
    <StyledFilters>
      <Tab selected type="button">
        Found
      </Tab>
      <Tab type="button">Lost</Tab>

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
  display: flex;
  border: 1px solid var(--secondary-color-12);
  border-radius: 100px;
`;

// TODO: fix selected state animation
const Tab = styled.button`
  position: relative;
  width: 160px;
  font-size: 14px;
  line-height: 20px;
  border: none;
  background-color: transparent;
  padding: 0 20px;

  ${(props) =>
    props.selected &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: -1px;
        bottom: -1px;
        left: -1px;
        right: -1px;
        border: 1px solid var(--secondary-color);
        border-radius: 100px;
      }
    `};
`;

const Search = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-right: 8px;
  padding-left: 16px;

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
