import React from 'react';
import styled from 'styled-components';

import Postings from './Postings';
import User from './User/index';

const Profile = () => {
  return (
    <StyledProfile>
      <User />
      <Postings />
    </StyledProfile>
  );
};

const StyledProfile = styled.div`
  display: grid;
  align-items: start;
  grid-template-columns: 5fr 7fr;
  grid-gap: 16px;
  padding: 16px 0;
`;

export default Profile;
