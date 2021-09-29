import React from 'react';
import styled from 'styled-components';

import Icon from '../Icon';
import AddIcon from '../../icons/AddIcon';

const InputFile = ({ handleChange }) => {
  return (
    <StyledInputFile>
      <div></div>

      <Button>
        <Circle>
          <Icon>
            <AddIcon />
          </Icon>
        </Circle>
        <Text>Add photos</Text>
        <input type="file" onChange={handleChange} />
      </Button>
    </StyledInputFile>
  );
};

const StyledInputFile = styled.div`
  display: flex;
`;

const Button = styled.div`
  position: relative;

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
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: var(--accent-primary-color);
  text-align: center;
  margin-top: 4px;
`;

export default InputFile;
