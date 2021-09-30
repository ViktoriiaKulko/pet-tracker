import React from 'react';
import styled from 'styled-components';

import Icon from '../Icon';
import CancelIcon from '../../icons/CancelIcon';

const Preview = ({ image, handleClick }) => {
  return (
    <StyledPreview
      style={{ backgroundImage: `url("${image}")` }}
      alt="pet's image"
    >
      <Button type="button" onClick={handleClick}>
        <Icon>
          <CancelIcon />
        </Icon>
      </Button>
    </StyledPreview>
  );
};

const StyledPreview = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 4px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  overflow: hidden;
  margin-right: 20px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--secondary-color-25);
  }
`;

const Button = styled.button`
  position: absolute;
  top: 2px;
  left: 2px;
  font-size: 16px;
  line-height: 0;
  color: var(--primary-color);
  border: none;
  background: transparent;
  z-index: 2;
  cursor: pointer;
  padding: 0;
`;

export default Preview;
