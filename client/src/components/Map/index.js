import React, { useEffect } from 'react';
import styled from 'styled-components';

import dogMarker from '../../assets/images/dog-marker.svg';
import catMarker from '../../assets/images/cat-marker.svg';
import hamsterMarker from '../../assets/images/hamster-marker.svg';
import anotherMarker from '../../assets/images/another-marker.svg';

let map;
const Map = ({ pets }) => {
  // map uploading
  useEffect(() => {
    function initMap() {
      map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 45.5056, lng: -73.5882 },
        zoom: 12,
      });

      // marker types
      const icons = {
        dog: { icon: dogMarker },
        cat: { icon: catMarker },
        hamster: { icon: hamsterMarker },
        another: { icon: anotherMarker },
      };

      // markers
      const features = [
        {
          position: new window.google.maps.LatLng(45.5056, -73.5882),
          type: 'dog',
        },
        {
          position: new window.google.maps.LatLng(45.5056, -73.5182),
          type: 'cat',
        },
      ];

      // create markers
      for (let i = 0; i < features.length; i++) {
        const marker = new window.google.maps.Marker({
          position: features[i].position,
          icon: icons[features[i].type].icon,
          map: map,
        });

        marker.addListener('click', () => {
          map.setZoom(15);
          map.setCenter(marker.getPosition());
          console.log(`marker ${features[i].type} clicked`);
        });
      }
    }

    initMap();

    return () => {
      map = null;
    };
  }, []);

  return <StyledMap id="map"></StyledMap>;
};

const StyledMap = styled.div`
  border-radius: 16px;
  border: 1px solid var(--secondary-color-25);

  /* & div[role='button'] {
    border: 1px solid red;
  } */
`;

export default Map;
