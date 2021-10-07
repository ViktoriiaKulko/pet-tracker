import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

import dogMarker from '../../assets/images/dog-marker.svg';
import catMarker from '../../assets/images/cat-marker.svg';
import hamsterMarker from '../../assets/images/hamster-marker.svg';
import anotherMarker from '../../assets/images/another-marker.svg';
import cluster from '../../assets/images/cluster.svg';

import { getPositionFromAddress } from '../../utils';
import usePrevious from '../../hooks/usePrevious';

let map;
let markers = [];

const Map = ({ postings, handleMarkerClick }) => {
  const mapEL = useRef(null);

  // get previousPostings
  const prevPostings = usePrevious(postings);

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
              _id: posting._id,
              position: new window.google.maps.LatLng(
                geometry.lat,
                geometry.lng
              ),
              type: posting.species,
            };
          })
        );

        const setMapOnAll = (map) => {
          for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
          }
        };
        // deletes all markers in the array by removing references to them
        setMapOnAll(null);
        markers = [];

        // create markers
        features.forEach((feature) => {
          const marker = new window.google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map,
          });

          markers.push(marker);

          marker.addListener('click', () => {
            map.setZoom(15);
            map.setCenter(marker.getPosition());
            handleMarkerClick(feature._id);
          });
        });

        // create clusters
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
      } catch (err) {
        console.log(err.message);
      }
    }

    // update map only if postings change, not change the order
    if (prevPostings && postings) {
      const prevPostingsIdsSorted = prevPostings
        .map((post) => post._id)
        .sort()
        .toString();

      const postingsIdsSorted = postings
        .map((post) => post._id)
        .sort()
        .toString();

      if (prevPostingsIdsSorted !== postingsIdsSorted) initMap();
    }
  }, [postings]);

  return <StyledMap ref={mapEL}></StyledMap>;
};

const StyledMap = styled.div`
  flex-grow: 1;
  border-radius: 16px;
  border: 1px solid var(--secondary-color-25);
`;

export default Map;
