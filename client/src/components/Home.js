import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getFoundPetsAPI } from '../api';

import Filters from './Filters';
import Card from './common/Card';
import Map from './Map';
import Loader from './common/Loader/index';

const Home = () => {
  const [foundPets, setFoundPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchFoundPets() {
      try {
        const response = await getFoundPetsAPI();
        setLoading(false);
        if (response.ok) {
          setFoundPets(response.data);
        } else {
          setError(true);
        }
      } catch (er) {
        setLoading(false);
        setError(true);
        console.log(er);
      }
    }
    fetchFoundPets();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>Something happened</div>;

  return (
    <>
      <Filters />

      <Content>
        <Cards>
          {foundPets.map((pet) => (
            <Card
              key={pet._id}
              _id={pet._id}
              image={pet.images[0]}
              name={pet.name}
              species={pet.species}
              date={pet.date}
              address={pet.address}
              age={pet.age}
              gender={pet.gender}
              traits={pet.traits}
              colour={pet.colour}
            />
          ))}
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
  overflow: hidden;
`;

const Cards = styled.div`
  overflow-y: auto;

  & > div {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default Home;
