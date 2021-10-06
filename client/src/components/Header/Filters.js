import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from '../../state';

const Filters = () => {
  const {
    state: { currentFilter },
    thunks: { getFoundPets, getLostPets },
  } = useContext(AppContext);

  // get found pets postings in the beggining because it's default filter
  useEffect(() => {
    getFoundPets();
  }, []);

  return (
    <StyledFilters currentFilter={currentFilter === 'found' ? 0 : 1}>
      <Tab
        selected={currentFilter === 'found'}
        type="button"
        onClick={getFoundPets}
      >
        Found
      </Tab>

      <Tab
        selected={currentFilter === 'lost'}
        type="button"
        onClick={getLostPets}
      >
        Lost
      </Tab>
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

export default Filters;
