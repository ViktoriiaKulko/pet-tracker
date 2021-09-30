import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { initialFormData } from '../../settings';

import Header from './Header';
import Body from './Body';

const Form = () => {
  const [action, setAction] = useState('found');
  const [pet, setPet] = useState('dog');
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, pet });
  };

  return (
    <Wrapper>
      <Header action={action} setAction={setAction} pet={pet} setPet={setPet} />
      <Body
        action={action}
        pet={pet}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Wrapper>
  );
};

// animation to show the form
const up = keyframes`
  from {
    transform: translate(-50%, 100%);
  }
  to {
    transform: translate(-50%, 0);
  }
`;

const Wrapper = styled.form`
  width: 560px;
  position: absolute;
  left: 50%;
  bottom: 0;
  top: 40px;
  transform: translate(-50%, 100%);
  border-radius: 16px 16px 0 0;
  overflow-y: auto;
  animation: 0.25s ${up} ease-out forwards;
  z-index: 2;
`;

export default Form;
