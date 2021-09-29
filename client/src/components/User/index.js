import React from 'react';
import styled from 'styled-components';

import Paper from '../common/Paper';
import Title from '../common/Title';

const User = () => {
  return (
    <Paper>
      <Wrapper>
        <Title left>User name</Title>
        <Contact>000 000 0000</Contact>
        <Button type="button">Edit</Button>
      </Wrapper>
    </Paper>
  );
};

const Wrapper = styled.div`
  padding: 32px;
`;

const Contact = styled.div`
  font-size: 18px;
  line-height: 24px;
  color: var(--secondary-color-50);
  margin: 12px 0;
`;

const Button = styled.button`
  font-size: 18px;
  line-height: 24px;
  color: var(--secondary-color-50);
  background-color: transparent;
  border: none;
  transition: color 0.3s;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: var(--secondary-color);
  }
`;

export default User;
