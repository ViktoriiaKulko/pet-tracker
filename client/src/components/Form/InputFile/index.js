import React from 'react';
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
  const uploadImages = (e) => {
    const files = e.target.files;
    const tempImagePreviews = imagePreviews;
    const tempImages = images;

    for (let file of [...files]) {
      if (tempImagePreviews.length < maxFiles) {
        const url = URL.createObjectURL(file);
        tempImagePreviews.push(url);
        tempImages.push(file);
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

        {imagePreviews.length < maxFiles && (
          <Input
            maxFiles={maxFiles}
            imagePreviews={imagePreviews}
            uploadImages={uploadImages}
          />
        )}
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default InputFile;
