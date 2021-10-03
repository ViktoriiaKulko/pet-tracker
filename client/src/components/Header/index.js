import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import Paper from '../common/Paper';
import Filters from './Filters';
import Controls from './Controls';

const Header = ({ showForm }) => {
  const { pathname } = useLocation();

  return (
    <Paper>
      <Wrapper>
        <Logo to="/">PetTracker</Logo>
        {/* show filters only on Home page */}
        {pathname === '/' && <Filters />}
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

const Logo = styled(Link)`
  font-size: 24px;
  line-height: 40px;
  font-weight: 700;
  color: inherit;
  text-decoration: none;
`;

export default Header;
