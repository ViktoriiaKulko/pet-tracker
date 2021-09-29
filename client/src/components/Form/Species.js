import React from 'react';
import styled from 'styled-components';

const Species = ({ title, image, selected, handleClick }) => {
  return (
    <Wrapper className={selected ? 'selected' : ''} onClick={handleClick}>
      <ImageBox className={title === 'Another' ? 'full-size' : ''}>
        <Image src={image} alt={title} />
      </ImageBox>

      <Title>{title}</Title>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  &.selected {
    pointer-events: none;

    & > div {
      &:first-child {
        background-color: var(--accent-primary-color);
        border-color: var(--accent-primary-color);
      }

      &:last-child {
        color: var(--secondary-color);
      }
    }
  }
`;

const ImageBox = styled.div`
  width: 105px;
  height: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--secondary-color-50);
  border-radius: 16px;
  transition: all 0.3s;

  &:hover {
    border-color: var(--accent-primary-color);
  }

  &.full-size {
    display: block;

    & > img {
      width: 100%;
      height: auto;
    }
  }
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 24px;
  transition: color 0.3s;
  margin-top: 8px;
  color: var(--secondary-color-50);
`;

export default Species;
