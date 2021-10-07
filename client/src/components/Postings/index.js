import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { getUserAPI, getPetAPI, removePostingAPI } from '../../api';
import { AppContext } from '../../state';
import { sortPostingsByDate } from '../../utils';

import Paper from '../common/Paper';
import Title from '../common/Title';
import { ChipOutline } from '../common/Chip';
import Card from '../common/Card';
import Loader from '../common/Loader';

const Postings = () => {
  const [foundPostings, setFoundPostings] = useState(null);
  const [lostPostings, setLostPostings] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('found');
  const [currentPostings, setCurrentPostings] = useState([]);
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
          setFoundPostings(foundPostings.sort(sortPostingsByDate));

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
          setLostPostings(lostPostings.sort(sortPostingsByDate));

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

  const handleRevomePosting = async (_id, action) => {
    try {
      const res = await removePostingAPI({ _id, action, email: user.email });

      if (res.ok) {
        if (action === 'found') {
          foundPostings.splice(foundPostings.indexOf(_id), 1);
          setCurrentPostings([...foundPostings]);
          setFoundPostings([...foundPostings]);
        } else {
          lostPostings.splice(lostPostings.indexOf(_id), 1);
          setFoundPostings(lostPostings);
          setCurrentPostings(lostPostings);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledProfile>
      <Paper>
        {loading && (
          <LoaderContainer>
            <Loader image="cat" />
          </LoaderContainer>
        )}

        {error && <Message>{error}</Message>}

        {!(loading || error) && (
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

            <Container>
              {currentPostings.length ? (
                <>
                  {currentPostings.map((posting) => (
                    <Card
                      {...posting}
                      key={posting._id}
                      image={posting.images[0]}
                      profile
                      handleClick={() =>
                        handleRevomePosting(posting._id, posting.action)
                      }
                    />
                  ))}
                </>
              ) : (
                <Message>You don't have any postings</Message>
              )}
            </Container>
          </Wrapper>
        )}
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

const Message = styled.div`
  color: var(--secondary-color-50);
  text-align: center;
  padding: 40px 0;
`;

const LoaderContainer = styled.div`
  padding: 40px;
  margin: 0 auto;
`;

export default Postings;
