import React, { useState } from 'react';
import styled from 'styled-components';

import Preview from './Preview';
import Input from './Input';

const InputFile = ({
  images,
  setImages,
  imagePreviews,
  setImagePreviews,
  maxFiles = 5,
}) => {
  const [error, setError] = useState(false);

  const uploadImages = (e) => {
    const files = e.target.files;
    const tempImagePreviews = imagePreviews;
    const tempImages = images;

    for (let file of [...files]) {
      if (tempImagePreviews.length < maxFiles) {
        const url = URL.createObjectURL(file);
        tempImagePreviews.push(url);
        tempImages.push(file);
      } else {
        setError(true);
        break;
      }
    }

    setImagePreviews([...tempImagePreviews]);
    setImages([...tempImages]);
  };

  const removeImage = (index) => {
    imagePreviews.splice(index, 1);
    setImagePreviews([...imagePreviews]);

    images.splice(index, 1);
    setImages([...images]);
  };

  return (
    <div>
      <Wrapper
        style={{
          justifyContent: imagePreviews.length ? 'flex-start' : 'center',
        }}
      >
        {!!imagePreviews.length && (
          <>
            {imagePreviews.map((image, index) => (
              <Preview
                image={image}
                key={index}
                handleClick={() => removeImage(index)}
              />
            ))}
          </>
        )}

        {/* visible if a user selected less images than maxFiles */}
        {imagePreviews.length < maxFiles && (
          <Input
            maxFiles={maxFiles}
            imagePreviews={imagePreviews}
            uploadImages={uploadImages}
          />
        )}
      </Wrapper>
      {/* visible if a user selected more images than maxFiles */}
      {error && <Message>Max. files {maxFiles}</Message>}
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Message = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: var(--error-color);
  margin-top: 8px;
`;

export default InputFile;
