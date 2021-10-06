import React from 'react';
import styled from 'styled-components';

import dog from '../../assets/images/dog.svg';
import cat from '../../assets/images/cat.svg';
import hamster from '../../assets/images/hamster.svg';

const images = { dog, cat, hamster };

const Filter = ({ image, selected, handleClick }) => {
  return (
    <StyledFilter
      className={selected ? 'selected' : ''}
      type="button"
      onClick={() => handleClick(selected ? null : image)}
    >
      <img src={images[image]} alt="cat" />
    </StyledFilter>
  );
};

const StyledFilter = styled.button`
  height: 40px;
  background-color: transparent;
  border: 1px solid var(--secondary-color-25);
  border-radius: 100px;
  transition: all 0.3s;
  cursor: pointer;
  padding: 0 20px;

  & > img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    border-color: var(--accent-primary-color);
  }

  &.selected {
    background-color: var(--accent-primary-color);
    border-color: var(--accent-primary-color);
  }
`;

export default Filter;
