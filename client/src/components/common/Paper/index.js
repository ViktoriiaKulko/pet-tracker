import React from 'react';
import styled from 'styled-components';

const Paper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  background-color: var(--primary-color);
  border-radius: 16px;
`;

export default Paper;
