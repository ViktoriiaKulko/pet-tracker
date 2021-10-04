import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker as DatePickerUI } from '@mui/lab';

const DatePicker = ({
  label,
  value,
  name,
  required,
  error,
  helperText,
  handleChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePickerUI
        label={label}
        value={value}
        name={name}
        disableFuture={true}
        onChange={(newValue) => {
          handleChange(newValue, name);
        }}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            required={required}
            error={error}
            helperText={helperText}
          />
        )}
      />
    </LocalizationProvider>
  );
};

const StyledTextField = styled(TextField)`
  &.MuiFormControl-root {
    width: 100%;
    /* border-bottom: 1px solid var(--secondary-color-25); */
  }

  & .MuiOutlinedInput-root {
    border-bottom: 1px solid var(--secondary-color-25);
    border-radius: 0;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  & .MuiInputLabel-root,
  & .MuiInputLabel-root.Mui-focused {
    left: -16px;
    color: var(--secondary-color-50);
  }

  & .MuiOutlinedInput-input.MuiInputBase-input {
    padding-left: 0;
    padding-bottom: 8px;
  }

  & .MuiFormHelperText-root {
    margin-left: 0;
  }
`;

export default DatePicker;
