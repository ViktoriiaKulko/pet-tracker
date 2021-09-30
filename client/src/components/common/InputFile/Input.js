import React from 'react';
import styled from 'styled-components';

import Icon from '../Icon';
import AddIcon from '../../icons/AddIcon';

const Input = ({ maxFiles, imagePreviews, uploadImages }) => {
  return (
    <StyledInput>
      <Circle>
        <Icon>
          <AddIcon />
        </Icon>
      </Circle>
      {/* hidden if one or more images are selected */}
      {!imagePreviews.length && (
        <Text>
          Add photos
          <SubText>Max. files {maxFiles}</SubText>
        </Text>
      )}
      <input
        type="file"
        name="images"
        multiple="multiple"
        onChange={uploadImages}
      />
    </StyledInput>
  );
};

const StyledInput = styled.div`
  position: relative;
  cursor: pointer;

  &:hover {
    & > div:first-child > div {
      transform: scale(1.2);
    }
  }

  & > input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }
`;

const Circle = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: var(--accent-primary-color);
  background-color: var(--neutral-color-100);
  border-radius: 50%;
  margin: 0 auto;

  & > div {
    transition: transform 0.3s;
  }
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: var(--accent-primary-color);
  text-align: center;
  margin-top: 4px;
`;

const SubText = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: var(--secondary-color-25);
  margin-top: 2px;
`;

export default Input;
