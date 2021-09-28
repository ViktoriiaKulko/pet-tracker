import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

const ModalBody = () => {
  return (
    <Wrapper>
      <Button height={60}>Submit</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--primary-color);
  padding: 16px 40px 40px;
`;

export default ModalBody;
