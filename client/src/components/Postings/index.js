import React from 'react';
import styled from 'styled-components';

import Paper from '../common/Paper';
import Title from '../common/Title';
import { ChipOutline } from '../common/Chip';
import Card from '../common/Card';

const Postings = () => {
  return (
    <Paper>
      <Wrapper>
        <Title left>Postings</Title>

        <Chips>
          <ChipOutline selected>Lost</ChipOutline>
          <ChipOutline>Found</ChipOutline>
        </Chips>

        <Container>
          <Card status="active" />
          <Card status="closed" />
        </Container>
      </Wrapper>
    </Paper>
  );
};

const Wrapper = styled.div`
  padding: 32px;
`;

const Chips = styled.div`
  display: flex;
  margin: 24px 0 32px;

  & > button {
    flex: 1;
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const Container = styled.div`
  & > div {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default Postings;
