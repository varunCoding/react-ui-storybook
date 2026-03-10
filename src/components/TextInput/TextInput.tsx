import React, { useState } from "react";
import {
  Box,
  TextField,
  type TextFieldProps,
  Typography,
  InputAdornment,
  IconButton,
  type OutlinedInputProps,
} from "@mui/material";

// Import Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

export type TextInputProps = Omit<TextFieldProps, "label" | "error" | "helperText"> & {
  label?: string;
  insuranceContext?: string;
  error?: boolean;
  helperText?: React.ReactNode;
  /** Custom validation function. Return a string error message if invalid, or undefined if valid. */
  validate?: (value: string) => string | undefined | null;
  /** Whether to validate automatically when the input loses focus. Default is true. */
  validateOnBlur?: boolean;
};

export const TextInput: React.FC<TextInputProps> = ({
  label,
  insuranceContext,
  required,
  sx,
  type = "text",
  error: propError,
  helperText: propHelperText,
  validate,
  validateOnBlur = true,
  onChange,
  onBlur,
  ...props
}) => {
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Validation states
  const [internalError, setInternalError] = useState(false);
  const [internalErrorMsg, setInternalErrorMsg] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  // Run validation checks
  const runValidation = (val: string) => {
    // 1. Custom prop validation
    if (validate) {
      const customError = validate(val);
      if (customError) {
        setInternalError(true);
        setInternalErrorMsg(customError);
        return false;
      }
    }

    // 2. Built-in validation based on type and required status
    if (required && !val) {
      setInternalError(true);
      setInternalErrorMsg("This field is required.");
      return false;
    }

    if (val) {
      if (type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          setInternalError(true);
          setInternalErrorMsg("Please enter a valid email address.");
          return false;
        }
      } else if (type === "tel") {
        const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(val)) {
          setInternalError(true);
          setInternalErrorMsg("Please enter a valid phone number.");
          return false;
        }
      }
    }

    setInternalError(false);
    setInternalErrorMsg("");
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // If there is already an error, re-validate on change to clear it dynamically when fixed
    if (internalError || propError) {
      runValidation(e.target.value);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (validateOnBlur) {
      runValidation(e.target.value);
    }
    if (onBlur) {
      onBlur(e);
    }
  };

  // Automatically determine adornments (icons) based on the input type
  const inputSlotProps = props.slotProps?.input as Partial<OutlinedInputProps> | undefined;
  let autoStartAdornment = inputSlotProps?.startAdornment;
  let autoEndAdornment = inputSlotProps?.endAdornment;
  let actualType = type;

  if (type === "password") {
    actualType = showPassword ? "text" : "password";
    autoEndAdornment = (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
          size="small"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    );
  } else if (type === "email" && !autoStartAdornment) {
    autoStartAdornment = (
      <InputAdornment position="start">
        <EmailIcon fontSize="small" sx={{ color: "text.secondary" }} />
      </InputAdornment>
    );
  } else if (type === "tel" && !autoStartAdornment) {
    autoStartAdornment = (
      <InputAdornment position="start">
        <PhoneIcon fontSize="small" sx={{ color: "text.secondary" }} />
      </InputAdornment>
    );
  }

  // Determine what helper text to display. Prioritize standard helperText, then internal validation error, then insurance context.
  const isError = propError !== undefined ? propError : internalError;
  const displayHelperText = propHelperText || internalErrorMsg || insuranceContext;

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

      <TextField
        id={props.id || props.name}
        fullWidth
        required={required}
        variant="outlined"
        type={actualType}
        error={isError}
        helperText={displayHelperText}
        onChange={handleChange}
        onBlur={handleBlur}
        // Merge automatic adornments with any custom slotProps the developer might pass
        slotProps={{
          ...props.slotProps,
          input: {
            ...(props.slotProps?.input as any),
            startAdornment: autoStartAdornment || (props.slotProps?.input as Partial<OutlinedInputProps>)?.startAdornment,
            endAdornment: autoEndAdornment || (props.slotProps?.input as Partial<OutlinedInputProps>)?.endAdornment,
          }
        }}
        {...props}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: "background.paper",
            transition: 'all 0.2s',
          },
        }}
      />
    </Box>
  );
};
