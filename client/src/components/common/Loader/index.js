import React from 'react';
import styled, { keyframes } from 'styled-components';

import dog from '../../../assets/images/dog.svg';
import cat from '../../../assets/images/cat.svg';

const images = { dog, cat };

const Loader = ({ image = 'dog' }) => {
  return (
    <StyledLoader>
      <Bar />
      <Image src={images[image]} />
    </StyledLoader>
  );
};

const spin = keyframes`
  to {
    border-top-color: #ff9e80;
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled.div`
  height: 72px;
  width: 72px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Bar = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 3px solid #ddd;
  border-top: 3px solid #aa80ff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Image = styled.img`
  width: 50%;
`;
export default Loader;
