import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

import dogMarker from '../../assets/images/dog-marker.svg';
import catMarker from '../../assets/images/cat-marker.svg';
import hamsterMarker from '../../assets/images/hamster-marker.svg';
import anotherMarker from '../../assets/images/another-marker.svg';
import cluster from '../../assets/images/cluster.svg';

import { getPositionFromAddress } from '../../utils';

let map;

const Map = ({ postings }) => {
  const mapEL = useRef(null);
  // map uploading
  useEffect(() => {
    async function initMap() {
      try {
        let center;

        if (postings.length) {
          // set the first posting as a center
          const firstMarkerGeometry = await getPositionFromAddress(
            postings[0].address
          );
          center = {
            lat: firstMarkerGeometry.lat,
            lng: firstMarkerGeometry.lng,
          };
        } else {
          // set Mont Royal Park as a center
          center = { lat: 45.5056, lng: -73.5882 };
        }

        map = new window.google.maps.Map(mapEL.current, {
          center,
          zoom: 12,
        });

        // marker types
        const icons = {
          dog: { icon: dogMarker },
          cat: { icon: catMarker },
          hamster: { icon: hamsterMarker },
          another: { icon: anotherMarker },
        };

        const features = await Promise.all(
          postings.map(async (posting) => {
            const geometry = await getPositionFromAddress(posting.address);
            return {
              position: new window.google.maps.LatLng(
                geometry.lat,
                geometry.lng
              ),
              type: posting.species,
            };
          })
        );

        // marker
        const markers = features.map((feature, i) => {
          return new window.google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
          });
        });

        // clusters
        new MarkerClusterer({
          markers,
          map,
          renderer: {
            render({ count, position }) {
              return new window.google.maps.Marker({
                icon: cluster,
                label: {
                  text: String(count),
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '14px',
                },
                position,
                zIndex: Number(window.google.maps.Marker.MAX_ZINDEX) + count,
              });
            },
          },
        });

        // // create markers
        // for (let i = 0; i < features.length; i++) {
        //   const marker = new window.google.maps.Marker({
        //     position: features[i].position,
        //     icon: icons[features[i].type].icon,
        //     map,
        //   });

        //   marker.addListener('click', () => {
        //     map.setZoom(15);
        //     map.setCenter(marker.getPosition());
        //     console.log(`marker ${features[i].type} clicked`);
        //   });
        // }
      } catch (err) {
        console.log(err.message);
      }
    }

    initMap();

    return () => {
      map = null;
    };
  }, [postings]);

  return <StyledMap ref={mapEL}></StyledMap>;
};

const StyledMap = styled.div`
  flex-grow: 1;
  border-radius: 16px;
  border: 1px solid var(--secondary-color-25);
`;

export default Map;
