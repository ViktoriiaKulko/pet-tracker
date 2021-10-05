import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import { getPetAPI } from '../api';
import { upperCaseFirstLetter } from '../utils';

import Paper from './common/Paper';
import Loader from './common/Loader';
import Map from './Map';

const Pet = () => {
  const { _id, action } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getFoundPetById() {
      try {
        const res = await getPetAPI(_id, action);

        if (res.ok) {
          setPet(res.data);
          setLoading(false);
        } else {
          setError(res.message);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        setError('Something went wrong. Please, reload the page.');
        console.log(err.message);
      }
    }
    getFoundPetById();
  }, [_id]);

  // wait for getting the posting
  if (loading)
    return (
      <Container>
        <Loader image="cat" />
      </Container>
    );

  // could not get the posting
  if (error)
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );

  // got the posting
  return (
    <StyledPet>
      <Paper fullHeight>
        <Wrapper>
          <Description>
            <Photos>
              <MainPhoto
                style={{ backgroundImage: `url("${pet.images[0]}")` }}
              />

              {pet.images.length > 1 && (
                <OtherPhotos>
                  {pet.images
                    .filter((_, index) => index !== 0)
                    .map((image, index) => (
                      <div
                        key={index}
                        style={{ backgroundImage: `url("${image}")` }}
                      ></div>
                    ))}
                </OtherPhotos>
              )}
            </Photos>

            <div>
              <Name>{pet.name ? pet.name : 'Name unknown'}</Name>
              <Info>
                <div>{upperCaseFirstLetter(pet.species)}</div>
                <Divider />
                <div>
                  {format(parseISO(pet.date), 'dd.MM.yyyy')} at{' '}
                  {format(parseISO(pet.date), 'HH:mm')}
                </div>
              </Info>
              <Address>{pet.address}</Address>

              <div>
                <span>{pet.userName}: </span>
                <Contact>{pet.userEmail}</Contact>
              </div>

              <About>
                {pet.age ? `${pet.age}  old ${pet.species}. ` : ''}
                {pet.gender ? `${upperCaseFirstLetter(pet.gender)}. ` : ''}
                {pet.colour
                  ? `${upperCaseFirstLetter(pet.colour)} colour. `
                  : ''}
                {pet.traits ? `${upperCaseFirstLetter(pet.traits)}.` : ''}
              </About>
            </div>
          </Description>

          <Map postings={[{ address: pet.address, species: pet.species }]} />
        </Wrapper>
      </Paper>
    </StyledPet>
  );
};

const Container = styled.div`
  margin: auto;
`;

const ErrorMessage = styled.div`
  color: var(--secondary-color-50);
`;

const StyledPet = styled.div`
  flex-grow: 1;
  font-size: 16px;
  line-height: 20px;
  margin: 16px 0;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px;
`;

const Photos = styled.div`
  display: flex;
  margin-right: 32px;
`;

const MainPhoto = styled.div`
  width: 320px;
  height: 320px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 4px;
`;

const OtherPhotos = styled.div`
  margin-left: 8px;

  & > div {
    width: 74px;
    height: 74px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 4px;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Description = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Name = styled.div`
  font-size: 24px;
  line-height: 28px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: var(--secondary-color-25);
  margin-left: 6px;
  margin-right: 6px;
`;

const Address = styled.div`
  font-weight: 500;
  color: var(--accent-primary-color);
  margin: 8px 0 4px;
`;

const Contact = styled.span`
  color: var(--secondary-color-50);
`;

const About = styled.div`
  color: var(--secondary-color-50);
  margin-top: 16px;
`;

export default Pet;
