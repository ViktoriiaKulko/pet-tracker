import React from 'react';
import styled from 'styled-components';

import dog from '../../assets/images/dog.svg';
import cat from '../../assets/images/cat.svg';
import hamster from '../../assets/images/hamster.svg';
import another from '../../assets/images/all-pets.svg';

import Title from '../common/Title';
import { Chip } from '../common/Chip';
import Species from './Species';

const species = [
  { title: 'Dog', image: dog },
  { title: 'Cat', image: cat },
  { title: 'Hamster', image: hamster },
  { title: 'Another', image: another },
];

const ModalHeader = () => {
  return (
    <Header>
      <Title>Form</Title>
      <Subtitle>Please provide as much detail as possible</Subtitle>

      <ChipGroup>
        <Chip selected>Found</Chip>
        <Chip>Lost</Chip>
      </ChipGroup>

      <SpeciesGroup>
        {species.map((item, index) => (
          <Species
            key={index}
            title={item.title}
            image={item.image}
            selected={index === 1}
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
