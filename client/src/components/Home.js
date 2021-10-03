import React, { useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from '../state';

import Filters from './Filters';
import Card from './common/Card';
import Map from './Map';
import Loader from './common/Loader';
import Error from './common/Error';

const Home = () => {
  const {
    state: { status, postings },
  } = useContext(AppContext);

  // wait for getting postings
  if (status === 'awaiting-response')
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );

  // could not get postings
  if (status === 'error')
    return (
      <Wrapper>
        <Error message="Could not upload postings. Please reload the page" />
      </Wrapper>
    );

  // got postings
  return (
    <>
      <Filters />

      <Content>
        <Cards>
          {postings.map((posting) => (
            <Card
              key={posting._id}
              _id={posting._id}
              image={posting.images[0]}
              name={posting.name}
              species={posting.species}
              date={posting.date}
              address={posting.address}
              age={posting.age}
              gender={posting.gender}
              traits={posting.traits}
              colour={posting.colour}
            />
          ))}
        </Cards>

        <Map />
      </Content>
    </>
  );
};

const Wrapper = styled.div`
  margin: auto;
`;

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
