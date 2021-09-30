import React from 'react';
import styled from 'styled-components';

import Input from '../common/Input';
import InputFile from '../common/InputFile';
import Button from '../common/Button';

const Body = ({ action, pet, formData, handleChange, handleSubmit }) => {
  return (
    <Wrapper>
      <Fields>
        {pet === 'another' && (
          <Input
            label="Species"
            value={formData.species}
            name="species"
            handleChange={handleChange}
          />
        )}

        <Input
          label="Name"
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
          label={`When did you ${
            action === 'found' ? 'find' : 'lose'
          } the pet?`}
          value={formData.date}
          name="date"
          required
          handleChange={handleChange}
        />

        <Input
          label={`What is the approximate address you ${action} the pet?`}
          value={formData.address}
          name="address"
          required
          handleChange={handleChange}
        />

        <Input
          label="Other traits"
          value={formData.traits}
          name="traits"
          isTextarea
          handleChange={handleChange}
        />

        <InputFile />
      </Fields>

      <Button type="submit" disabled={true} handleClick={handleSubmit}>
        Submit
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--primary-color);
  padding: 16px 40px 40px;
`;

const Fields = styled.div`
  & > div {
    margin-bottom: 24px;
  }
`;

export default Body;
