import React from 'react';
import styled from 'styled-components';

import Filters from './Filters';
import Card from './common/Card';
import Map from './Map';

const Home = () => {
  return (
    <>
      <Filters />

      <Content>
        <Cards>
          <Card selected />
        </Cards>

        <Map />
      </Content>
    </>
  );
};

const Content = styled.div`
  flex-grow: 1;
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
