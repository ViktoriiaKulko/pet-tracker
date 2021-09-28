import React from 'react';
import styled from 'styled-components';

import Paper from '../Paper';

const Card = ({ image, name, species, date, address }) => {
  return (
    <Paper>
      <Wrapper>
        <FlexContainer>
          <Image style={{ backgroundImage: `url('${image}')` }} />
          <div>
            <Name>Name</Name>
            <FlexContainer>
              <div>Cat</div>
              <Divider />
              <div>01.01.2021 at 6pm</div>
            </FlexContainer>
            <Address>Address</Address>
          </div>
        </FlexContainer>

        <Description>Long long description</Description>
      </Wrapper>
    </Paper>
  );
};

const Wrapper = styled.div`
  font-size: 12px;
  line-height: 16px;
  padding: 20px;
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
  background-repeat: contain;
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

export default Card;
