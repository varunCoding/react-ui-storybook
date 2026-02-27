import React, { useState } from "react";
import {
  Box,
  TextField,
  type TextFieldProps,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

// Import Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

export type TextInputProps = Omit<TextFieldProps, "label"> & {
  label?: string;
  insuranceContext?: string;
};

export const TextInput: React.FC<TextInputProps> = ({
  label,
  insuranceContext,
  required,
  sx,
  type = "text",
  InputProps,
  ...props
}) => {
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  // Automatically determine adornments (icons) based on the input type
  let autoStartAdornment = InputProps?.startAdornment;
  let autoEndAdornment = InputProps?.endAdornment;
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
            color: "text.primary",
          }}
        >
          {label}{" "}
          {required && (
            <Box component="span" sx={{ color: "error.main" }}>
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
        helperText={insuranceContext || props.helperText}
        // Merge automatic adornments with any custom InputProps the developer might pass
        InputProps={{
          ...InputProps,
          startAdornment: autoStartAdornment,
          endAdornment: autoEndAdornment,
        }}
        {...props}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: "common.white",
          },
        }}
      />
    </Box>
  );
};
