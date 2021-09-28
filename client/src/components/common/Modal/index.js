import React from 'react';
import styled from 'styled-components';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';

const Modal = () => {
  return (
    <Wrapper>
      <Form>
        <ModalHeader />
        <ModalBody />
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--secondary-color-50);
`;

const Form = styled.form`
  width: 560px;
  border-radius: 16px;
  overflow: hidden;
`;

export default Modal;
