import React from 'react';
import styled from 'styled-components';

import Paper from '../common/Paper';
import Filters from './Filters';
import Controls from './Controls';

const Header = ({ showForm }) => {
  return (
    <Paper>
      <Wrapper>
        <Logo>PetTracker</Logo>
        <Filters />
        <Controls showForm={showForm} />
      </Wrapper>
    </Paper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  padding: 16px 32px;
`;

const Logo = styled.div`
  font-size: 24px;
  line-height: 40px;
  font-weight: 700;
`;

export default Header;
