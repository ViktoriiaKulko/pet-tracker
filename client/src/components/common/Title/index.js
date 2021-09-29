import React from 'react';
import styled from 'styled-components';

const Title = ({ left, children }) => {
  return <StyledTitle left={left}>{children}</StyledTitle>;
};

const StyledTitle = styled.h1`
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
  text-align: ${(props) => (props.left ? 'left' : 'center')};
`;

export default Title;
