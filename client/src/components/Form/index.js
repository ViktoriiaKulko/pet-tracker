import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { initialFormData } from '../../settings';

import Header from './Header';
import Body from './Body';

const Form = () => {
  const [action, setAction] = useState('found');
  const [pet, setPet] = useState('dog');
  const [formData, setFormData] = useState(initialFormData);
  const [images, setImages] = useState([]);

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // upload the images to cloudinary
    const imageUrls = [];
    await Promise.all(
      images.map(async (elem) => {
        const data = new FormData();
        data.append('file', elem);
        data.append('upload_preset', 'petTracker');

        try {
          const res = await fetch(
            `${process.env.REACT_APP_CLOUDINARY_API_BASE_URL}image/upload`,
            { method: 'POST', body: data }
          );
          if (res.ok) {
            const file = await res.json();
            imageUrls.push(file.secure_url);
          }
        } catch (err) {
          // TODO: set an error message
          console.log(err);
        }
      })
    );

    console.log({ ...formData, pet, imageUrls });
  };

  return (
    <Wrapper>
      <Header action={action} setAction={setAction} pet={pet} setPet={setPet} />
      <Body
        action={action}
        unknownPet={pet === 'another'}
        formData={formData}
        handleChange={handleChange}
        images={images}
        setImages={setImages}
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
