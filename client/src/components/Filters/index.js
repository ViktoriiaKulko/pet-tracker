import React from 'react';
import styled from 'styled-components';

import Filter from './Filter';

const Filters = ({ currentFilter, setCurrentFilter }) => {
  return (
    <StyledFilters>
      <Filter
        image="dog"
        selected={currentFilter === 'dog'}
        handleClick={setCurrentFilter}
      />

      <Filter
        image="cat"
        selected={currentFilter === 'cat'}
        handleClick={setCurrentFilter}
      />

      <Filter
        image="hamster"
        selected={currentFilter === 'hamster'}
        handleClick={setCurrentFilter}
      />
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
