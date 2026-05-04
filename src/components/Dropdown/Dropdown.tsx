import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Checkbox,
  ListItemText,
  type SelectChangeEvent,
  type SelectProps,
} from "@mui/material";

export interface DropdownOption {
  label: string;
  value: string | number;
}

export type DropdownProps = Omit<SelectProps, "onChange" | "error" | "value"> & {
  /** The label displayed above the dropdown */
  label?: string;
  /** List of options to display */
  options: DropdownOption[];
  /** Helper text to display below the dropdown */
  helperText?: React.ReactNode;
  /** Whether the dropdown has an error state */
  error?: boolean;
  /** Custom validation function. Return a string error message if invalid, or undefined if valid. */
  validate?: (value: any) => string | undefined | null;
  /** Whether to validate automatically when the input loses focus. Default is true. */
  validateOnBlur?: boolean;
  /** Called when the selected value changes */
  onChange?: (value: any) => void;
  /** Current selected value(s) */
  value?: any;
};

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options = [],
  multiple = false,
  required,
  sx,
  error: propError,
  helperText: propHelperText,
  validate,
  validateOnBlur = true,
  onChange,
  onBlur,
  value,
  placeholder,
  ...props
}) => {
  // Internal state for uncontrolled usage
  const [internalValue, setInternalValue] = useState<any>(multiple ? [] : "");

  // Validation states
  const [internalError, setInternalError] = useState(false);
  const [internalErrorMsg, setInternalErrorMsg] = useState("");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const isError = propError !== undefined ? propError : internalError;
  const displayHelperText = propHelperText || internalErrorMsg;

  // Run validation checks
  const runValidation = (val: any) => {
    // 1. Custom prop validation
    if (validate) {
      const customError = validate(val);
      if (customError) {
        setInternalError(true);
        setInternalErrorMsg(customError);
        return false;
      }
    }

    // 2. Built-in validation based on required status
    if (required) {
      if (multiple && (!val || val.length === 0)) {
        setInternalError(true);
        setInternalErrorMsg("This field is required.");
        return false;
      }
      if (!multiple && (val === "" || val === undefined || val === null)) {
        setInternalError(true);
        setInternalErrorMsg("This field is required.");
        return false;
      }
    }

    setInternalError(false);
    setInternalErrorMsg("");
    return true;
  };

  const handleChange = (event: SelectChangeEvent<any>) => {
    const val = event.target.value;
    
    if (!isControlled) {
      setInternalValue(val);
    }

    // If there is already an error, re-validate on change to clear it dynamically when fixed
    if (internalError || propError) {
      runValidation(val);
    }
    if (onChange) {
      onChange(val);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (validateOnBlur) {
      runValidation(currentValue); // we use the controlled or uncontrolled value to validate
    }
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <Box sx={{ width: props.fullWidth !== false ? "100%" : "auto", ...sx }}>
      {label && (
        <Typography
          variant="body2"
          component="label"
          htmlFor={props.id || props.name}
          sx={{
            display: "block",
            mb: 0.5,
            fontWeight: 600,
            color: isError ? "error.main" : "text.primary",
            transition: 'color 0.2s',
          }}
        >
          {label}{" "}
          {required && (
            <Box component="span" sx={{ color: "error.main", ml: 0.5 }}>
              *
            </Box>
          )}
        </Typography>
      )}

      <FormControl fullWidth={props.fullWidth} error={isError}>
        <Select
          id={props.id || props.name}
          multiple={multiple}
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          displayEmpty={!!placeholder}
          renderValue={(selected) => {
            if (multiple) {
              const selectedOptions = selected as (string | number)[];
              if (selectedOptions.length === 0 && placeholder) {
                return <Typography sx={{ color: "text.secondary" }}>{placeholder}</Typography>;
              }
              return options
                .filter((opt) => selectedOptions.includes(opt.value))
                .map((opt) => opt.label)
                .join(", ");
            }

            if ((selected === "" || selected === undefined) && placeholder) {
              return <Typography sx={{ color: "text.secondary" }}>{placeholder}</Typography>;
            }

            const selectedOption = options.find((opt) => opt.value === selected);
            return selectedOption ? selectedOption.label : selected;
          }}
          sx={{
            borderRadius: "8px",
            backgroundColor: "background.paper",
            transition: 'all 0.2s',
          }}
          {...props}
        >
          {placeholder && !multiple && (
            <MenuItem value="" disabled>
              <Typography sx={{ color: "text.secondary" }}>{placeholder}</Typography>
            </MenuItem>
          )}
          
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {multiple && (
                <Checkbox checked={Array.isArray(currentValue) && currentValue.includes(option.value)} />
              )}
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
        {displayHelperText && (
          <FormHelperText>{displayHelperText}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};
