import React from 'react';
import styled from 'styled-components';
import { ChipOutline } from '../common/Chip';

const Filters = () => {
  return (
    <StyledFilters>
      <ChipOutline selected>Filter 1</ChipOutline>
      <ChipOutline>Filter 2</ChipOutline>
    </StyledFilters>
  );
};

const StyledFilters = styled.div`
  display: flex;
  padding: 16px 0;

  & > button {
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default Filters;
