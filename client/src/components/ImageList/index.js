import React, { useState } from 'react';
import styled from 'styled-components';

import useKeyPress from '../../hooks/useKeyPress';

import Carousel from '../common/Carousel';
import Overlay from '../common/Overlay';

const ImageList = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [carouselVisible, setCarouselVisible] = useState(false);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setCarouselVisible(true);
  };

  const hideCarousel = () => setCarouselVisible(false);

  useKeyPress({
    key: 'Escape',
    onKeyDown: hideCarousel,
  });

  return (
    <StyledImageList>
      <MainPhoto
        style={{ backgroundImage: `url("${images[0]}")` }}
        onClick={() => handleImageClick(0)}
      />

      {images.length > 1 && (
        <OtherPhotos>
          {images
            .filter((_, index) => index !== 0)
            .map((image, index) => (
              <button
                key={index}
                style={{ backgroundImage: `url("${image}")` }}
                onClick={() => handleImageClick(index + 1)}
              ></button>
            ))}
        </OtherPhotos>
      )}

      {carouselVisible && (
        <Overlay>
          <Carousel
            images={images}
            selectedIndex={selectedImageIndex}
            handleHideCarousel={hideCarousel}
          />
        </Overlay>
      )}
    </StyledImageList>
  );
};

const StyledImageList = styled.div`
  display: flex;
`;

const MainPhoto = styled.button`
  width: 320px;
  height: 320px;
  background-color: transparent;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const OtherPhotos = styled.div`
  margin-left: 8px;

  & > button {
    display: block;
    width: 74px;
    height: 74px;
    background-color: transparent;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default ImageList;
