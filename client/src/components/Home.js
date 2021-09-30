import React, { useEffect } from 'react';
import styled from 'styled-components';

import Filters from './Filters';
import Card from './common/Card';

// let map;
const Home = () => {
  // ---- map uploading ----------------------------
  // useEffect(() => {
  //   function initMap() {
  //     map = new window.google.maps.Map(document.getElementById('map'), {
  //       center: { lat: -34.397, lng: 150.644 },
  //       zoom: 8,
  //     });
  //   }

  //   setTimeout(initMap, 50);

  //   return () => {
  //     map = null;
  //   };
  // }, []);
  //------------------------------------------------

  return (
    <div>
      <Filters />

      <Content>
        <Cards>
          <Card selected />
        </Cards>

        <div id="map"></div>
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
