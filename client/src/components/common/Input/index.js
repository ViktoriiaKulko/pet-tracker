import React from 'react';
import styled from 'styled-components';

const Input = ({
  label,
  type = 'text',
  value,
  name,
  required,
  isTextarea,
  handleChange,
}) => {
  return (
    <StyledInput className={value ? 'filled' : ''}>
      {isTextarea ? (
        <textarea
          id={name}
          type={type}
          value={value}
          name={name}
          rows={3}
          required={required}
          onChange={(e) => handleChange(e.target.value, name)}
        ></textarea>
      ) : (
        <input
          id={name}
          type={type}
          value={value}
          name={name}
          required={required}
          onChange={(e) => handleChange(e.target.value, name)}
        />
      )}

      <label htmlFor={name}>
        {label}
        {required && '*'}
      </label>
    </StyledInput>
  );
};

const StyledInput = styled.div`
  position: relative;
  padding-top: 14px;

  & > input,
  & > textarea {
    width: 100%;
    font-size: 16px;
    line-height: 24px;
    border: none;
    outline: none;
    border-bottom: 1px solid var(--secondary-color-25);
    caret-color: var(--accent-primary-color);

    &:focus {
      & + label {
        transform: scale(0.75) translateY(-22px);
      }
    }
  }

  & > input {
    height: 26px;
  }

  & > textarea {
    resize: none;
  }

  & > label {
    position: absolute;
    top: 14px;
    left: 0;
    font-size: 16px;
    line-height: 24px;
    color: var(--secondary-color-50);
    transition: transform 0.3s;
    transform-origin: 0 0;
  }

  &.filled {
    & > label {
      transform: scale(0.75) translateY(-22px);
    }
  }
`;

export default Input;
