import styled from 'styled-components';

const Paper = styled.div`
  width: 100%;
  height: ${(props) => (props.fullHeight ? '100%' : 'auto')};
  background-color: var(--primary-color);
  border-radius: 16px;
`;

export default Paper;
