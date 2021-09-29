import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../common/Input';
import InputFile from '../common/InputFile';
import Button from '../common/Button';

const initialFormData = {
  fullName: '',
  name: '',
  gender: '',
  age: '',
  colour: '',
  traits: '',
  date: '',
  address: '',
};

const Body = () => {
  const [formData, setFormData] = useState(initialFormData);

  // handle the form inputs changes
  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Wrapper>
      <Fields>
        <Input
          label="Full name"
          value={formData.fullName}
          name="fullName"
          required
          handleChange={handleChange}
        />

        <Input
          label="Pet's name"
          value={formData.name}
          name="name"
          handleChange={handleChange}
        />

        <Input
          label="Gender"
          value={formData.gender}
          name="gender"
          handleChange={handleChange}
        />

        <Input
          label="Age"
          value={formData.age}
          name="age"
          handleChange={handleChange}
        />

        <Input
          label="Colour"
          value={formData.colour}
          name="colour"
          handleChange={handleChange}
        />

        <Input
          label="Other traits"
          value={formData.traits}
          name="traits"
          isTextarea
          handleChange={handleChange}
        />

        <Input
          label="When did you found/lost the pet?"
          value={formData.date}
          name="date"
          required
          handleChange={handleChange}
        />

        <Input
          label="What is the approximate address you found/lost the pet?"
          value={formData.address}
          name="address"
          required
          handleChange={handleChange}
        />

        <InputFile />
      </Fields>

      <Button type="submit">Submit</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--primary-color);
  padding: 16px 40px 40px;
`;

const Fields = styled.div`
  margin-bottom: 16px;

  & > div {
    margin-bottom: 24px;

    &:last-child {
      display: block;
      margin: 0 auto 16px;
    }
  }
`;

export default Body;
