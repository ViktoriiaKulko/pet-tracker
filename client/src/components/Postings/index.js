import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { getUserAPI, getPetAPI } from '../../api';
import { AppContext } from '../../state';

import Paper from '../common/Paper';
import Title from '../common/Title';
import { ChipOutline } from '../common/Chip';
import Card from '../common/Card';

const Postings = () => {
  const [foundPostings, setFoundPostings] = useState(null);
  const [lostPostings, setLostPostings] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('found');
  const [currentPostings, setCurrentPostings] = useState('found');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {
    state: { user },
  } = useContext(AppContext);

  useEffect(() => {
    async function getUser() {
      try {
        // get the user's data
        const res = await getUserAPI(user.email);

        if (res.ok) {
          const { foundPets, lostPets } = res.data;
          const foundPostings = [];
          const lostPostings = [];

          // get the user's found postings
          await Promise.all(
            foundPets.map(async (id) => {
              try {
                const res = await getPetAPI(id, 'found');
                if (res.ok) {
                  foundPostings.push(res.data);
                }
              } catch (err) {
                console.log(err.message);
              }
            })
          );
          setFoundPostings(foundPostings);

          // get the user's lost postings
          await Promise.all(
            lostPets.map(async (id) => {
              try {
                const res = await getPetAPI(id, 'lost');
                if (res.ok) {
                  lostPostings.push(res.data);
                }
              } catch (err) {
                console.log(err.message);
              }
            })
          );
          setLostPostings(lostPostings);

          // set displayed postings
          setCurrentPostings(foundPostings);
          setLoading(false);
        } else {
          setLoading(false);
          setError(res.message);
        }
      } catch (err) {
        setLoading(false);
        setError('Something went wrong. Please, reload the page.');
        console.log(err);
      }
    }

    if (user) getUser();
  }, [user]);

  const handleFilterClick = (currentFilter, postings) => {
    setCurrentFilter(currentFilter);
    setCurrentPostings(postings);
  };

  return (
    <StyledProfile>
      <Paper>
        <Wrapper>
          <div>
            <Title left>Postings</Title>
            <Chips>
              <ChipOutline
                selected={currentFilter === 'found'}
                handleClick={() => handleFilterClick('found', foundPostings)}
              >
                Found
              </ChipOutline>

              <ChipOutline
                selected={currentFilter === 'lost'}
                handleClick={() => handleFilterClick('lost', lostPostings)}
              >
                Lost
              </ChipOutline>
            </Chips>
          </div>

          {/* {loading && <div>Loading..</div>} */}
          {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}

          {!(loading || error) && (
            <Container>
              {currentPostings.map((posting) => (
                <Card
                  key={posting._id}
                  _id={posting._id}
                  action={posting.action}
                  image={posting.images[0]}
                  name={posting.name}
                  species={posting.species}
                  date={posting.date}
                  address={posting.address}
                  age={posting.age}
                  gender={posting.gender}
                  traits={posting.traits}
                  colour={posting.colour}
                  status="active"
                />
              ))}
            </Container>
          )}
        </Wrapper>
      </Paper>
    </StyledProfile>
  );
};

const StyledProfile = styled.div`
  height: 100%;
  overflow: hidden;

  & > div {
    max-height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  flex-grow: 1;
  overflow-y: auto;

  & > div {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ErrorMessage = styled.div`
  color: var(--secondary-color-50);
  text-align: center;
  margin: 40px auto;
`;

export default Postings;
