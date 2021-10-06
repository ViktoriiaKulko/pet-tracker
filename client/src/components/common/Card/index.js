import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import { upperCaseFirstLetter } from '../../../utils';

import Paper from '../Paper';
import Button from '../Button';

// card content
const Content = ({
  image,
  species,
  name,
  date,
  address,
  age,
  gender,
  colour,
  traits,
}) => {
  const visibleDescription = age || gender || colour || traits;

  return (
    <>
      <FlexContainer>
        <Image style={{ backgroundImage: `url('${image}')` }} />
        <div>
          <Name>{name ? name : 'Unknown'}</Name>
          <FlexContainer>
            <div>{upperCaseFirstLetter(species)}</div>
            <Divider />
            <div>
              {format(parseISO(date), 'dd.MM.yyyy')} at{' '}
              {format(parseISO(date), 'HH:mm')}
            </div>
          </FlexContainer>
          <Address>{address}</Address>
        </div>
      </FlexContainer>

      {visibleDescription && (
        <Description>
          {age ? `${age}  old ${species}. ` : ''}
          {gender ? `${upperCaseFirstLetter(gender)}. ` : ''}
          {colour ? `${upperCaseFirstLetter(colour)} colour. ` : ''}
          {traits ? `${upperCaseFirstLetter(traits)}.` : ''}
        </Description>
      )}
    </>
  );
};

const Card = ({
  _id,
  action,
  image,
  name,
  species,
  date,
  address,
  gender,
  colour,
  age,
  traits,
  selected,
  profile,
  handleClick,
}) => {
  return (
    <Paper>
      {/* if card in profile  */}
      {profile ? (
        <Wrapper>
          <Content
            image={image}
            species={species}
            name={name}
            date={date}
            address={address}
            age={age}
            gender={gender}
            colour={colour}
            traits={traits}
          />
          <RemoveButton>
            <Button handleClick={handleClick}>Close posting</Button>
          </RemoveButton>
        </Wrapper>
      ) : (
        <StyledLink selected={selected} to={`/pet/${_id}/${action}`}>
          <Content
            image={image}
            species={species}
            name={name}
            date={date}
            address={address}
            age={age}
            gender={gender}
            colour={colour}
            traits={traits}
          />
        </StyledLink>
      )}
    </Paper>
  );
};

const StyledLink = styled(Link)`
  display: block;
  font-size: 12px;
  line-height: 16px;
  color: inherit;
  text-decoration: none;
  border: 1px solid transparent;
  border-color: ${(props) =>
    props.selected ? 'var(--accent-secondary-color)' : 'transparent'};
  border-radius: 16px;
  transition: border-color 0.3s;
  padding: 19px;

  &:hover {
    border-color: var(--accent-primary-color);
  }
`;

const Wrapper = styled.div`
  font-size: 12px;
  line-height: 16px;
  border: 1px solid var(--accent-primary-color);
  border-radius: 16px;
  transition: border-color 0.3s;
  padding: 19px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  width: 80px;
  height: 80px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 4px;
  margin-right: 20px;
`;

const Name = styled.div`
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const Divider = styled.div`
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background-color: var(--secondary-color-25);
  margin-left: 4px;
  margin-right: 4px;
`;

const Address = styled.div`
  font-weight: 500;
  color: var(--accent-primary-color);
  margin-top: 12px;
`;

const Description = styled.div`
  color: var(--secondary-color-50);
  margin-top: 16px;
`;

const RemoveButton = styled.div`
  margin-top: 12px;
`;

export default Card;
