import React from 'react';
import styled, { css } from 'styled-components';

const Species = ({ title, image, selected, handleClick }) => {
  const fullSizeImage = title === 'Another';

  return (
    <Wrapper onClick={handleClick}>
      <ImageBox selected={selected} fullSizeImage={fullSizeImage}>
        <Image src={image} alt={title} fullSizeImage={fullSizeImage} />
      </ImageBox>
      <Title selected={selected}>{title}</Title>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ImageBox = styled.div`
  width: 105px;
  height: 105px;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 16px;
  transition: all 0.3s;
  /* dynamically computed  */
  display: ${(props) => (props.fullSizeImage ? 'block' : 'flex')};
  background-color: ${(props) =>
    props.selected ? 'var(--accent-primary-color)' : 'transparent'};
  border-color: ${(props) =>
    props.selected
      ? 'var(--accent-primary-color)'
      : 'var(--secondary-color-50)'};

  ${(props) =>
    !props.selected &&
    css`
      &:hover {
        border-color: var(--accent-primary-color);
      }
    `}
`;

const Image = styled.img`
  width: ${(props) => (props.fullSizeImage ? '100%' : '80px')};
  width: ${(props) => (props.fullSizeImage ? 'auto' : '80px')};
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 24px;
  transition: color 0.3s;
  margin-top: 8px;
  /* dynamically computed  */
  color: ${(props) =>
    props.selected ? 'var(--secondary-color)' : 'var(--secondary-color-50)'};
`;

export default Species;
