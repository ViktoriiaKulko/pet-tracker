import React from 'react';
import { IMaskInput } from 'react-imask';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';

// mask for date inputs
const DateMask = React.forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="00-00-0000"
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

const Input = ({
  label,
  value,
  name,
  required,
  error,
  helperText,
  multiline,
  date,
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
      InputProps={{
        inputComponent: date && DateMask,
      }}
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
