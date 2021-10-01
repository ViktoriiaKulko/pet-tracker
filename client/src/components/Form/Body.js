import React from 'react';
import styled from 'styled-components';

import Input from '../common/Input';
import InputFile from '../common/InputFile';
import Button from '../common/Button';
import Select from '../common/Select';

const Body = ({
  action,
  unknownPet,
  formData,
  handleChange,
  images,
  setImages,
  handleSubmit,
  errorMessage,
}) => {
  return (
    <Wrapper>
      <Fields>
        {/* if the pet species isn't in the species list */}
        {unknownPet && (
          <Input
            label="Species"
            value={formData.species.value}
            name="species"
            required
            error={formData.species.error}
            helperText={formData.species.helperText}
            handleChange={handleChange}
          />
        )}

        <Input
          label="Name"
          value={formData.name.value}
          name="name"
          handleChange={handleChange}
        />

        <Select
          label="Gender"
          value={formData.gender.value}
          name="gender"
          options={[
            { title: 'Male', value: 'male' },
            { title: 'Female', value: 'female' },
            { title: 'Do not know', value: 'unknown' },
          ]}
          handleChange={handleChange}
        />

        <Input
          label="Age"
          value={formData.age.value}
          name="age"
          handleChange={handleChange}
        />

        <Input
          label="Colour"
          value={formData.colour.value}
          name="colour"
          handleChange={handleChange}
        />

        <Input
          label={`When did you ${
            action === 'found' ? 'find' : 'lose'
          } the pet?`}
          value={formData.date.value}
          name="date"
          required
          error={formData.date.error}
          helperText={formData.date.helperText}
          date
          handleChange={handleChange}
        />

        <Input
          label={`What is the approximate address you ${action} the pet?`}
          value={formData.address.value}
          name="address"
          required
          error={formData.address.error}
          helperText={formData.address.helperText}
          handleChange={handleChange}
        />

        <Input
          label="Other traits"
          value={formData.traits.value}
          name="traits"
          multiline
          handleChange={handleChange}
        />

        <InputFile images={images} setImages={setImages} />
      </Fields>

      <Button type="submit" handleClick={handleSubmit}>
        Submit
      </Button>

      {errorMessage && <Message>{errorMessage}</Message>}
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

const Message = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: var(--error-color);
  margin-top: 8px;
`;

export default Body;
