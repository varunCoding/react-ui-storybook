import React from "react";
import { Card, type SxProps, type Theme } from "@mui/material";

export interface CustomCardProps {
  /** The inner component or custom elements rendered inside the card */
  children?: React.ReactNode;
  /** Custom background color (default: 'background.paper') */
  backgroundColor?: string;
  /** Custom border radius (default: '24px') */
  borderRadius?: string | number;
  /** Custom border color (default: 'divider') */
  borderColor?: string;
  /** Custom border width (default: '1.5px') */
  borderWidth?: string | number;
  /** Custom box shadow (default: 'none') */
  boxShadow?: string;
  /** Custom HTML wrapper element tag (default: 'div') */
  component?: React.ElementType;
  /** Custom internal padding for the card wrapper (default: 0) */
  padding?: string | number;
  className?: string;
  sx?: SxProps<Theme>;
}

export const CustomCard: React.FC<CustomCardProps> = ({
  children,
  backgroundColor = "background.paper",
  borderRadius = "24px",
  borderColor = "divider",
  borderWidth = "1.5px",
  boxShadow = "none",
  component,
  padding = 0,
  className,
  sx,
}) => {
  return (
    <Card
      component={component}
      className={className}
      elevation={0}
      sx={{
        borderRadius: borderRadius,
        border: borderWidth ? `${borderWidth} solid` : "none",
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        boxShadow: boxShadow,
        padding: padding,
        overflow: "visible", // Allows popups or hover triggers to render fully
        width: "100%",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      {children}
    </Card>
  );
};
