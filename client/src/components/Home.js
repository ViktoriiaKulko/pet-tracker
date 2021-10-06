import React, { useState, useEffect, useContext } from 'react';
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
  const [currentFilter, setCurrentFilter] = useState(null);
  const [displayedPostings, setDisplayedPostings] = useState(postings);

  // filter displayed postings if currentFilter changes
  useEffect(() => {
    if (currentFilter) {
      const filteredPostings = postings.filter(
        (posting) => posting.species === currentFilter
      );
      setDisplayedPostings(filteredPostings);
    } else {
      setDisplayedPostings(postings);
    }
  }, [currentFilter, postings]);

  useEffect(() => {
    setDisplayedPostings(postings);
  }, [postings]);

  // wait for getting postings
  if (status === 'awaiting-response')
    return (
      <Wrapper>
        <Loader image="cat" />
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
      <Filters
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />

      <Content>
        <Cards>
          {displayedPostings.length ? (
            <>
              {displayedPostings.map((posting) => (
                <Card
                  {...posting}
                  key={posting._id}
                  image={posting.images[0]}
                />
              ))}
            </>
          ) : (
            <Message>There are not any postings</Message>
          )}
        </Cards>

        <Map
          postings={displayedPostings.map((posting) => {
            return {
              species: posting.species,
              address: posting.address,
            };
          })}
        />
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

const Message = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--secondary-color-50);
`;

export default Home;
