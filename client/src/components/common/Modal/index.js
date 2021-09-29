import React from 'react';
import styled from 'styled-components';

import Paper from '../Paper';
import Title from '../Title';

const Modal = ({ title, children }) => {
  return (
    <StyledModal>
      <Paper>
        <Wrapper>
          <Title>{title}</Title>
          <Body>{children}</Body>
        </Wrapper>
      </Paper>
    </StyledModal>
  );
};

const StyledModal = styled.div`
  width: 400px;
`;

const Wrapper = styled.div`
  padding: 40px;
`;

const Body = styled.div`
  margin-top: 40px;
`;

export default Modal;
