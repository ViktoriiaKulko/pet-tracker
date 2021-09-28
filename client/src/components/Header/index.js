import React from 'react';
import styled from 'styled-components';

import Paper from '../common/Paper';

const Header = () => {
  return (
    <Paper>
      <Wrapper>
        <div>logo</div>
        <div>tabs</div>
        <div>search</div>
        <div>sing in</div>
        <button>+</button>
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

export default Header;
