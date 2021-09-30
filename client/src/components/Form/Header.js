import React from 'react';
import styled from 'styled-components';

import { species } from '../../settings';

import Title from '../common/Title';
import { Chip } from '../common/Chip';
import Species from './Species';

const ModalHeader = ({ action, setAction, pet, setPet }) => {
  return (
    <Header>
      <Title>Information about the pet</Title>
      <Subtitle>Please provide as much detail as possible</Subtitle>

      {/* select the action: a user lost or found a pet */}
      <ChipGroup>
        <Chip
          selected={action === 'found'}
          handleClick={() => setAction('found')}
        >
          Found
        </Chip>

        <Chip
          selected={action === 'lost'}
          handleClick={() => setAction('lost')}
        >
          Lost
        </Chip>
      </ChipGroup>

      {/* select the pet species a user lost or found */}
      <SpeciesGroup>
        {species.map((item) => (
          <Species
            key={item.id}
            title={item.title}
            image={item.image}
            selected={pet === item.id}
            handleClick={() => setPet(item.id)}
          />
        ))}
      </SpeciesGroup>
    </Header>
  );
};

const Header = styled.div`
  background-color: var(--neutral-color-200);
  padding: 40px;
`;

const Subtitle = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: var(--secondary-color-25);
  text-align: center;
  margin-top: 4px;
  margin-bottom: 40px;
`;

const ChipGroup = styled.div`
  display: flex;
  margin-bottom: 40px;

  & > button {
    flex: 1;
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const SpeciesGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ModalHeader;
