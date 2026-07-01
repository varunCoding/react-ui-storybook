import React from "react";
import { Button as MuiButton, type ButtonProps as MuiButtonProps } from "@mui/material";

export interface PillButtonProps extends Omit<MuiButtonProps, "style" | "variant"> {
  /** The text label inside the button */
  label: string;
  /** Whether to show a down caret icon on the right side of the label */
  showDropdownIcon?: boolean;
  /** Whether the button covers 100% width on mobile and auto on desktop. Default is true. */
  responsiveFullWidth?: boolean;
  /** The variant style: 'outlined' or 'contained'. Default is 'outlined'. */
  variant?: "outlined" | "contained";
  className?: string;
  style?: never;
}

const CaretDownIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block" }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const PillButton: React.FC<PillButtonProps> = ({
  label,
  showDropdownIcon = false,
  responsiveFullWidth = true,
  variant = "outlined",
  disabled,
  className,
  sx,
  ...props
}) => {
  const isOutlined = variant === "outlined";

  return (
    <MuiButton
      className={className}
      disabled={disabled}
      endIcon={showDropdownIcon ? <CaretDownIcon /> : undefined}
      sx={{
        // Pill geometry
        borderRadius: "9999px",
        height: "48px",
        px: 3.5,
        py: 0,
        textTransform: "none",
        fontSize: "16px",
        fontWeight: 600,
        letterSpacing: "0.2px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",

        // Responsive Sizing
        width: responsiveFullWidth ? { xs: "100%", sm: "fit-content" } : "fit-content",

        // Variant Styling override for premium border appearance
        ...(isOutlined
          ? {
              backgroundColor: "transparent",
              border: "2px solid",
              borderColor: disabled ? "action.disabled" : "primary.main",
              color: disabled ? "text.disabled" : "primary.main",
              "&:hover": {
                border: "2px solid",
                borderColor: disabled ? "action.disabled" : "primary.dark",
                backgroundColor: disabled ? "transparent" : "rgba(0, 91, 159, 0.06)",
                boxShadow: "0 4px 12px rgba(0, 91, 159, 0.12)",
                transform: disabled ? "none" : "translateY(-1px)",
              },
              "&:active": {
                transform: disabled ? "none" : "translateY(0)",
              },
            }
          : {
              backgroundColor: disabled ? "action.disabled" : "primary.main",
              border: "2px solid",
              borderColor: disabled ? "action.disabled" : "primary.main",
              color: disabled ? "text.disabled" : "primary.contrastText",
              boxShadow: disabled ? "none" : "0 4px 14px rgba(0, 91, 159, 0.2)",
              "&:hover": {
                border: "2px solid",
                borderColor: disabled ? "action.disabled" : "primary.dark",
                backgroundColor: disabled ? "action.disabled" : "primary.dark",
                boxShadow: disabled ? "none" : "0 6px 20px rgba(0, 91, 159, 0.3)",
                transform: disabled ? "none" : "translateY(-1px)",
              },
              "&:active": {
                transform: disabled ? "none" : "translateY(0)",
                boxShadow: disabled ? "none" : "0 2px 8px rgba(0, 91, 159, 0.2)",
              },
            }),

        // Override default MUI icon margins to align neatly
        "& .MuiButton-endIcon": {
          ml: 1.25,
          color: "inherit",
          transition: "transform 0.2s ease",
        },
        
        // Subtle arrow rotation on hover for active dropdown feel
        ...(showDropdownIcon && !disabled && {
          "&:hover .MuiButton-endIcon": {
            transform: "translateY(1px)",
          }
        }),

        ...sx,
      }}
      {...props}
    >
      {label}
    </MuiButton>
  );
};
