import React from 'react';
import styled from 'styled-components';

import Paper from './common/Paper';

const Pet = () => {
  return (
    <StyledPet>
      <Paper>
        <Wrapper>
          <Description>
            <Photos>photos</Photos>

            <div>
              <Name>Pet name</Name>
              <Info>
                <div>Cat</div>
                <Divider />
                <div>01.01.2021 at 6pm</div>
              </Info>
              <Address>Address</Address>
              <div>
                <span>Ivan: </span>
                <Contact>000 000 0000</Contact>
              </div>
              <About>
                Black pug, 8 years old. Male. Wears a blue collar, afraid of
                loud sounds.
              </About>
            </div>
          </Description>

          <div>map</div>
        </Wrapper>
      </Paper>
    </StyledPet>
  );
};

const StyledPet = styled.div`
  font-size: 16px;
  line-height: 20px;
  margin: 16px 0;
`;

const Wrapper = styled.div`
  padding: 32px;
`;

const Photos = styled.div`
  margin-right: 32px;
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
  margin: 8px 0;
`;

const Contact = styled.span`
  color: var(--secondary-color-50);
`;

const About = styled.div`
  color: var(--secondary-color-50);
  margin-top: 16px;
`;

export default Pet;
