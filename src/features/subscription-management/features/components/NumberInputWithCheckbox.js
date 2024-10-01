// NumberInputWithCheckbox.js
import React from 'react';
import { Controller } from 'react-hook-form';
import { Grid, TextField, Checkbox, FormControl, FormControlLabel, Typography} from '@mui/material';

const NumberInputWithCheckbox = ({
  control,
  name,
  label,
  placeholder,
  disabled,
  error,
  checkboxLabel,
  onChange,
}) => {
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value } }) => (
          <TextField
            fullWidth
            type="number"
            value={value}
            label={label}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            placeholder={placeholder}
            error={Boolean(error)}
            disabled={disabled}
            aria-describedby={`validation-basic-${name}`}
          />
        )}
      />
      <FormControl>
        <Controller
          name={`${name}_checkbox`}
          control={control}
          render={({ field }) => (
            <FormControlLabel
              label={checkboxLabel}
              control={
                <Checkbox
                  {...field}
                  onChange={() => {
                    field.onChange();
                  }}
                  disabled={disabled}
                />
              }
            />
          )}
        />
        {error && (
          <Typography sx={{ mx: 0, color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}>
            {error}
          </Typography>
        )}
      </FormControl>
    </Grid>
  );
};

export default NumberInputWithCheckbox;
