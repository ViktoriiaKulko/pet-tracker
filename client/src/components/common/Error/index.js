import React from 'react';
import styled from 'styled-components';

import emptyState from '../../../assets/images/empty-state.png';

const Error = ({ message }) => {
  return (
    <div>
      <Image src={emptyState} alt="" />
      <Message>{message}</Message>
    </div>
  );
};

const Image = styled.img`
  display: block;
  width: 240px;
  margin: 0 auto 32px;
`;

const Message = styled.div`
  max-width: 280px;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  color: var(--secondary-color-25);
`;

export default Error;
