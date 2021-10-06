import styled from 'styled-components';

// background for modal windows
const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--secondary-color-50);
  z-index: 3;
`;

export default Overlay;
