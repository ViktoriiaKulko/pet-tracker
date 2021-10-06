import React from 'react';
import styled from 'styled-components';

const ImageCollection = ({ images }) => {
  return (
    <StyledImageCollection>
      <MainPhoto style={{ backgroundImage: `url("${images[0]}")` }} />

      {images.length > 1 && (
        <OtherPhotos>
          {images
            .filter((_, index) => index !== 0)
            .map((image, index) => (
              <div
                key={index}
                style={{ backgroundImage: `url("${image}")` }}
              ></div>
            ))}
        </OtherPhotos>
      )}
    </StyledImageCollection>
  );
};

const StyledImageCollection = styled.div`
  display: flex;
`;

const MainPhoto = styled.div`
  width: 320px;
  height: 320px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 4px;
`;

const OtherPhotos = styled.div`
  margin-left: 8px;

  & > div {
    width: 74px;
    height: 74px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 4px;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default ImageCollection;
