import React from "react";
import { Box, type SxProps, type Theme } from "@mui/material";

export interface BadgeProps {
  /** The text content or React element displayed inside the badge */
  label: React.ReactNode;
  /** Optional icon rendered on the left of the badge label text */
  icon?: React.ReactNode;
  /** Custom background color (e.g. 'rgba(0, 91, 159, 0.08)', 'success.light', '#f0f0f0') */
  backgroundColor?: string;
  /** Custom text/foreground color (e.g. 'primary.main', 'success.dark', '#111') */
  textColor?: string;
  /** Custom font size (default: '11px') */
  fontSize?: string | number;
  /** Custom font weight (default: 700) */
  fontWeight?: string | number;
  /** Optional custom font family */
  fontFamily?: string;
  /** Custom corner border radius (default: '6px') */
  borderRadius?: string | number;
  /** Custom padding override (default: vertical 2px (0.25), horizontal 10px (1.25)) */
  padding?: string | number;
  className?: string;
  sx?: SxProps<Theme>;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  icon,
  backgroundColor = "rgba(0, 91, 159, 0.08)",
  textColor = "primary.main",
  fontSize = "11px",
  fontWeight = 700,
  fontFamily,
  borderRadius = "6px",
  padding,
  className,
  sx,
}) => {
  return (
    <Box
      className={className}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundColor,
        color: textColor,
        borderRadius: borderRadius,
        fontSize: fontSize,
        fontWeight: fontWeight,
        fontFamily: fontFamily,
        // Adjust default padding to look balanced if an icon is present
        padding: padding !== undefined 
          ? padding 
          : icon 
            ? "2px 10px 2px 8px" // slightly less left padding to balance icon
            : "2px 10px",
        
        lineHeight: 1.2,
        letterSpacing: "0.2px",
        whiteSpace: "nowrap",
        userSelect: "none",
        width: "fit-content",
        textTransform: "none",
        
        transition: "all 0.2s ease-in-out",
        ...sx,
      }}
    >
      {icon && (
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 0.75, // margin spacing to separate from label text
            flexShrink: 0,
            "& svg": {
              width: "12px",
              height: "12px",
              display: "block",
            },
            "& img": {
              width: "12px",
              height: "12px",
              display: "block",
            },
          }}
        >
          {icon}
        </Box>
      )}
      {label}
    </Box>
  );
};
