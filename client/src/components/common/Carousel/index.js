import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import useKeyPress from '../../../hooks/useKeyPress';

import Icon from '../Icon';
import ArrowRightIcon from '../../icons/ArrowRightIcon';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon';
import CancelIcon from '../../icons/CancelIcon';

const Carousel = ({ images, selectedIndex = 0, handleHideCarousel }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(selectedIndex);
  const [visibleImage, setVisibleImage] = useState(null);

  const prevSlide = () => {
    const lastIndex = images.length - 1;
    const resetIndex = currentSlideIndex === 0;
    const index = resetIndex ? lastIndex : currentSlideIndex - 1;
    setCurrentSlideIndex(index);
  };

  const nextSlide = () => {
    const lastIndex = images.length - 1;
    const resetIndex = currentSlideIndex === lastIndex;
    const index = resetIndex ? 0 : currentSlideIndex + 1;
    setCurrentSlideIndex(index);
  };

  useKeyPress({
    key: 'ArrowLeft',
    onKeyDown: prevSlide,
  });

  useKeyPress({ key: 'ArrowRight', onKeyDown: nextSlide });

  useEffect(() => {
    setVisibleImage(images[currentSlideIndex]);
  }, [currentSlideIndex, images]);

  return (
    <StyledCarousel>
      <Slide style={{ backgroundImage: `url("${visibleImage}")` }} />

      <ButtonPrev type="button" onClick={prevSlide}>
        <Icon>
          <ArrowLeftIcon />
        </Icon>
      </ButtonPrev>

      <ButtonNext type="button" onClick={nextSlide}>
        <Icon>
          <ArrowRightIcon />
        </Icon>
      </ButtonNext>

      <ButtonClose type="button" onClick={handleHideCarousel}>
        <Icon>
          <CancelIcon />
        </Icon>
      </ButtonClose>
    </StyledCarousel>
  );
};

const StyledCarousel = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 3;
  padding: 40px;

  &:hover > button {
    opacity: 1;
  }
`;

const Button = styled.button`
  font-size: 40px;
  line-height: 0;
  color: var(--primary-color-75);
  background-color: transparent;
  border: none;
  transition: all 0.3s;
  cursor: pointer;
  opacity: 0;
  padding: 0;

  &:hover {
    color: var(--primary-color);
  }
`;

const ButtonPrev = styled(Button)`
  order: 0;
`;

const ButtonNext = styled(Button)`
  order: 2;
`;

const ButtonClose = styled(Button)`
  position: absolute;
  top: 40px;
  right: 40px;
`;

const Slide = styled.div`
  width: 560px;
  height: 560px;
  order: 1;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.3s;
  margin: 0 40px;

  /*  hide buttons hovering over slide */
  &:hover ~ button {
    opacity: 0;
  }
`;

export default Carousel;
