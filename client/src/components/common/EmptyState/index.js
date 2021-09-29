import React from 'react';
import styled from 'styled-components';

import emptyState from '../../../assets/images/empty-state.png';

const EmptyState = () => {
  return (
    <div>
      <Image src={emptyState} alt="" />
      <Message>Something happend</Message>
    </div>
  );
};

const Image = styled.img`
  display: block;
  width: 240px;
  margin: 0 auto 32px;
`;

const Message = styled.div`
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  color: var(--secondary-color-25);
`;

export default EmptyState;
