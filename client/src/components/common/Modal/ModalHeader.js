import React from 'react';
import styled from 'styled-components';

import dog from '../../../assets/images/dog.svg';
import cat from '../../../assets/images/cat.svg';
import hamster from '../../../assets/images/hamster.svg';
import another from '../../../assets/images/all-pets.svg';

import Chip from './Chip';
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

      <ChipGroup>
        <Chip selected>Found</Chip>
        <Chip>Lost</Chip>
      </ChipGroup>

      <SpeciesGroup>
        {species.map((item, ind) => (
          <Species key={ind} title={item.title} image={item.image} />
        ))}
      </SpeciesGroup>
    </Header>
  );
};

const Header = styled.div`
  background-color: var(--body-bg-color);
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
  text-align: center;
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
