import React, { useState } from "react";
import {
  Box,
  Checkbox as MuiCheckbox,
  type CheckboxProps as MuiCheckboxProps,
  Typography,
  FormHelperText,
  FormControl,
} from "@mui/material";

export type CheckboxProps = Omit<
  MuiCheckboxProps,
  "label" | "error" | "style" | "checked" | "onChange"
> & {
  /** The text/element to display on the right side of the checkbox */
  label?: React.ReactNode;
  /** Custom validation function. Return a string error message if invalid, or undefined/null if valid. */
  validate?: (checked: boolean) => string | undefined | null;
  /** Whether to validate automatically when focus is lost. Default is true. */
  validateOnBlur?: boolean;
  /** Helper text to show below the checkbox */
  helperText?: React.ReactNode;
  /** Forced error state from props */
  error?: boolean;
  /** Controlled checked state */
  checked?: boolean;
  /** Callback when checked state changes */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: never;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  required,
  error: propError,
  helperText: propHelperText,
  validate,
  validateOnBlur = true,
  onChange,
  onBlur,
  checked,
  disabled,
  className,
  sx,
  ...props
}) => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(false);
  const currentChecked = isControlled ? !!checked : internalChecked;

  // Validation States
  const [internalError, setInternalError] = useState(false);
  const [internalErrorMsg, setInternalErrorMsg] = useState("");

  const isError = propError !== undefined ? propError : internalError;
  const displayHelperText = propHelperText || internalErrorMsg;

  // Run validation
  const runValidation = (val: boolean) => {
    // 1. Custom validation function
    if (validate) {
      const customError = validate(val);
      if (customError) {
        setInternalError(true);
        setInternalErrorMsg(customError);
        return false;
      }
    }

    // 2. Required check (must be checked if required)
    if (required && !val) {
      setInternalError(true);
      setInternalErrorMsg("You must check this box to proceed.");
      return false;
    }

    setInternalError(false);
    setInternalErrorMsg("");
    return true;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    if (!isControlled) {
      setInternalChecked(isChecked);
    }

    // Dynamic re-validation if already in error state
    if (internalError || propError) {
      runValidation(isChecked);
    }

    if (onChange) {
      onChange(isChecked, event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (validateOnBlur) {
      runValidation(currentChecked);
    }
    if (onBlur) {
      onBlur(event);
    }
  };

  // Custom unchecked icon
  const uncheckedIcon = (
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: "8px",
        border: "2px solid",
        borderColor: disabled ? "action.disabled" : isError ? "error.main" : "text.secondary",
        backgroundColor: disabled ? "action.hover" : "background.paper",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );

  // Custom checked icon
  const checkedIcon = (
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: "8px",
        backgroundColor: disabled ? "action.disabled" : "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: disabled ? "none" : "0 2px 8px rgba(0, 91, 159, 0.25)",
        animation: "checkbox-pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "@keyframes checkbox-pop": {
          "0%": { transform: "scale(0.8)" },
          "100%": { transform: "scale(1)" },
        },
      }}
    >
      <svg
        width="14"
        height="10"
        viewBox="0 0 14 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 5L5.5 8L11.5 2"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );

  // Custom indeterminate icon
  const indeterminateIcon = (
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: "8px",
        backgroundColor: disabled ? "action.disabled" : "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: disabled ? "none" : "0 2px 8px rgba(0, 91, 159, 0.25)",
        animation: "checkbox-pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <Box
        sx={{
          width: 12,
          height: 2.5,
          borderRadius: "1px",
          backgroundColor: "white",
        }}
      />
    </Box>
  );

  return (
    <FormControl
      className={className}
      error={isError}
      disabled={disabled}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      <Box
        component="label"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          cursor: disabled ? "default" : "pointer",
          userSelect: "none",
          width: "fit-content",
          // Premium subtle color transition on hover
          "&:hover .checkbox-icon-unchecked": {
            borderColor: disabled ? "action.disabled" : isError ? "error.main" : "primary.main",
            boxShadow: disabled ? "none" : "0 0 0 4px rgba(0, 91, 159, 0.08)",
          },
          "&:hover .checkbox-icon-checked": {
            transform: disabled ? "none" : "scale(1.03)",
            boxShadow: disabled ? "none" : "0 3px 10px rgba(0, 91, 159, 0.35)",
          },
        }}
      >
        <MuiCheckbox
          checked={currentChecked}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          icon={React.cloneElement(uncheckedIcon, { className: "checkbox-icon-unchecked" })}
          checkedIcon={React.cloneElement(checkedIcon, { className: "checkbox-icon-checked" })}
          indeterminateIcon={React.cloneElement(indeterminateIcon, { className: "checkbox-icon-checked" })}
          required={required}
          sx={{
            padding: 0,
            mr: 1.5,
            "&.Mui-focusVisible .checkbox-icon-unchecked, &.Mui-focusVisible .checkbox-icon-checked": {
              boxShadow: "0 0 0 4px rgba(0, 91, 159, 0.25)",
            },
          }}
          {...props}
        />

        {label && (
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: disabled
                ? "text.disabled"
                : isError
                ? "error.main"
                : "text.primary",
              transition: "color 0.2s ease",
            }}
          >
            {label}
            {required && (
              <Box component="span" sx={{ color: "error.main", ml: 0.5 }}>
                *
              </Box>
            )}
          </Typography>
        )}
      </Box>

      {displayHelperText && (
        <FormHelperText
          sx={{
            ml: 4.5, // Align helper text with the label content (checkbox width 24px + mr 12px)
            mt: 0.5,
          }}
        >
          {displayHelperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
