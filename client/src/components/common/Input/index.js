import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';

const Input = ({
  label,
  value,
  name,
  required,
  error,
  helperText,
  multiline,
  handleChange,
}) => {
  return (
    <StyledInput
      id={name}
      label={label}
      name={name}
      value={value}
      required={required}
      fullWidth
      helperText={helperText}
      error={error}
      multiline={multiline}
      rows={3}
      variant="standard"
      onChange={(e) => handleChange(e.target.value, name)}
    />
  );
};

const StyledInput = styled(TextField)`
  caret-color: var(--accent-primary-color);

  & .MuiInput-root {
    border-bottom: 1px solid var(--secondary-color-25);
  }

  & .MuiInput-root::before,
  & .MuiInput-root::after {
    display: none;
  }

  & .MuiInputLabel-root,
  & .MuiInputLabel-root.Mui-focused {
    color: var(--secondary-color-50);
  }
`;

export default Input;
