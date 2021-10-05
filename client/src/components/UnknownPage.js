import React from 'react';
import styled from 'styled-components';

import Error from './common/Error';

const UnknownPage = () => {
  return (
    <StyledUnknownPage>
      <Error message="404: Oops!" />
    </StyledUnknownPage>
  );
};

const StyledUnknownPage = styled.div`
  margin: auto;
`;

export default UnknownPage;
