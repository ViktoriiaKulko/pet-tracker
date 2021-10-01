import React from 'react';
import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select as UISelect } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

const Select = ({
  label,
  value,
  name,
  options,
  error,
  helperText,
  handleChange,
}) => {
  return (
    <FormControl variant="standard" fullWidth error={error}>
      <StyledInputLabel id={name}>{label}</StyledInputLabel>
      <StyledUISelect
        labelId={name}
        id={name}
        value={value}
        onChange={(e) => handleChange(e.target.value, name)}
        label={label}
      >
        {options.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.title}
          </MenuItem>
        ))}
      </StyledUISelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

const StyledInputLabel = styled(InputLabel)`
  &.MuiFormLabel-root {
    color: var(--secondary-color-50);

    &.Mui-focused {
      color: var(--secondary-color-50);
    }
  }
`;

const StyledUISelect = styled(UISelect)`
  border-bottom: 1px solid var(--secondary-color-25);

  &::before,
  &::after {
    display: none;
  }
`;

export default Select;
