import React from 'react';
import styled from 'styled-components';

const Icon = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
`;

export default Icon;
