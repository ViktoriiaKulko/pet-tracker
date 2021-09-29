import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Body from './Body';

const Form = () => {
  return (
    <Wrapper>
      <Header />
      <Body />
    </Wrapper>
  );
};

const Wrapper = styled.form`
  width: 560px;
`;

export default Form;
