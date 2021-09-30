import React, { useState } from 'react';
import styled from 'styled-components';

import Icon from '../Icon';
import AddIcon from '../../icons/AddIcon';
import Preview from './Preview';

const MAX_FILES = 5;

const InputFile = ({ handleChange }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);

  const uploadImage = (e) => {
    const files = e.target.files;
    const tempImages = images;

    for (let file of [...files]) {
      if (tempImages.length < MAX_FILES) {
        const url = URL.createObjectURL(file);
        tempImages.push(url);
      } else {
        setError(true);
        break;
      }
    }

    setImages([...tempImages]);
    // await Promise.all(
    //   [...files].map(async (elem) => {
    //     const data = new FormData();
    //     data.append('file', elem);
    //     data.append('upload_preset', 'petTracker');

    //     const res = await fetch(
    //       'https://api.cloudinary.com/v1_1/dgkzvtqja/image/upload',
    //       { method: 'POST', body: data }
    //     );
    //     const file = await res.json();
    //     tempImages.push({ url: file.secure_url, id: file.public_id });
    //   })
    // );
  };

  const removeImage = (index) => {
    images.splice(index, 1);
    setImages([...images]);
  };

  return (
    <div>
      <Wrapper
        style={{ justifyContent: images.length ? 'flex-start' : 'center' }}
      >
        {!!images.length && (
          <>
            {images.map((image, index) => (
              <Preview
                image={image}
                key={index}
                handleClick={() => removeImage(index)}
              />
            ))}
          </>
        )}

        {images.length < MAX_FILES && (
          <Button>
            <Circle>
              <Icon>
                <AddIcon />
              </Icon>
            </Circle>
            {!images.length && (
              <Text>
                Add photos
                <SubText>Max. files {MAX_FILES}</SubText>
              </Text>
            )}
            <input
              type="file"
              name="images"
              multiple="multiple"
              onChange={uploadImage}
            />
          </Button>
        )}
      </Wrapper>
      {error && <Message>Max. files {MAX_FILES}</Message>}
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  position: relative;
  cursor: pointer;

  &:hover {
    & > div:first-child > div {
      transform: scale(1.2);
    }
  }

  & > input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }
`;

const Circle = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: var(--accent-primary-color);
  background-color: var(--neutral-color-100);
  border-radius: 50%;
  margin: 0 auto;

  & > div {
    transition: transform 0.3s;
  }
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: var(--accent-primary-color);
  text-align: center;
  margin-top: 4px;
`;

const SubText = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: var(--secondary-color-25);
  margin-top: 2px;
`;

const Message = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: var(--accent-secondary-color);
  margin-top: 8px;
`;

export default InputFile;
