import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { initialFormData } from '../../settings';
import { addPostingAPI } from '../../api';

import Header from './Header';
import Body from './Body';
import Icon from '../common/Icon';
import CancelIcon from '../icons/CancelIcon';

const Form = ({ visibleForm, setVisibleForm }) => {
  // form data
  const [action, setAction] = useState('found');
  const [species, setSpecies] = useState('dog');
  const [formData, setFormData] = useState(initialFormData);
  // uploaded files
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  // states
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // handle inputs changes
  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: { ...formData[name], value } });
  };

  const cleanUp = () => {
    setAction('found');
    setSpecies('dog');
    setFormData(initialFormData);
    setImages([]);
    setImagePreviews([]);
    setSuccess(false);
    setLoading(false);
    setErrorMessage('');
  };

  const uploadImagesToCloudinary = async () => {
    let imageUrls = [];

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
          } else {
            setErrorMessage(
              'Could not upload your images. Please, try again or reload the page'
            );
            setLoading(false);
          }
        } catch (err) {
          setErrorMessage(
            'Could not upload your images. Please, try again or reload the page'
          );
          setLoading(false);
          console.log(err);
        }
      })
    );

    return imageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrls = await uploadImagesToCloudinary();

    // send data if the images were uploaded
    if (imageUrls.length) {
      try {
        const response = await addPostingAPI({
          action,
          species,
          name: formData.name.value,
          gender: formData.gender.value,
          age: formData.age.value,
          colour: formData.colour.value,
          traits: formData.traits.value,
          date: formData.date.value,
          address: formData.address.value,
          images: imageUrls,
        });
        if (response.ok) {
          setSuccess(true);

          setTimeout(() => {
            setVisibleForm(false);
            cleanUp();
          }, 1500);
        } else {
          setErrorMessage(
            'Something went wrong. Please, try again or reload the page'
          );
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        setErrorMessage(
          'Something went wrong. Please, try again or reload the page'
        );
        console.log(err);
      }
    }
  };

  const handleCloseForm = () => {
    cleanUp();
    setVisibleForm(false);
  };

  return (
    // these classes are for the animation. Comparison that visibleForm !== null
    <Wrapper
      className={`${visibleForm === true ? 'visible' : ''} ${
        visibleForm === false ? 'hidden' : ''
      }`}
    >
      <Content className={loading ? 'loading' : ''}>
        <Header
          action={action}
          setAction={setAction}
          species={species}
          setSpecies={setSpecies}
        />
        <Body
          action={action}
          unknownSpecies={species === 'another'}
          formData={formData}
          handleChange={handleChange}
          images={images}
          setImages={setImages}
          imagePreviews={imagePreviews}
          setImagePreviews={setImagePreviews}
          loading={loading}
          success={success}
          errorMessage={errorMessage}
          handleSubmit={handleSubmit}
        />
      </Content>

      <Button type="button" onClick={handleCloseForm}>
        <Icon>
          <CancelIcon />
        </Icon>
      </Button>
    </Wrapper>
  );
};

// animation to show the form
const up = keyframes`
  to {
    transform: translate(-50%, 0);
  }
`;

// animation to hide the form
const down = keyframes`
  from {
    transform: translate(-50%, 0);
  }
  to {
    transform: translate(-50%, 100%);
  }
`;

const Wrapper = styled.div`
  width: 560px;
  position: absolute;
  left: 50%;
  bottom: 0;
  top: 40px;
  transform: translate(-50%, 100%);
  animation: ;
  z-index: 2;

  &.visible {
    animation: 0.25s ${up} ease-in forwards;
  }

  &.hidden {
    animation: 0.25s ${down} ease-out forwards;
  }
`;

const Content = styled.form`
  width: 100%;
  height: 100%;
  border-radius: 16px 16px 0 0;
  overflow-y: auto;

  &.loading {
    pointer-events: none;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 16px;
  right: -56px;
  font-size: 32px;
  line-height: 0;
  color: var(--primary-color);
  background-color: transparent;
  border: none;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

export default Form;
