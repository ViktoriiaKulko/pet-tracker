import React from 'react';
import styled from 'styled-components';

import Card from './common/Card';

const Home = () => {
  return (
    <div>
      <div>filters</div>

      <Content>
        <Cards>
          <Card />
        </Cards>

        <div>map</div>
      </Content>
    </div>
  );
};

const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 5fr;
  grid-gap: 8px;
`;

const Cards = styled.div`
  & > div {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default Home;
