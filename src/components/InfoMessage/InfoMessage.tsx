import React from "react";
import { Box, Typography, type SxProps, type Theme } from "@mui/material";

export interface InfoMessageProps {
  /** The message text or React node content */
  message: React.ReactNode;
  /** Custom icon. Can be an SVG Component, an instantiated React node, or a URL string for PNG/SVG files. */
  icon?: React.ReactNode | React.ComponentType<any> | string;
  /** Sizing of the icon in pixels. Default is 20. */
  iconSize?: number;
  /** Primary color for the icon. Defaults to theme's primary.main. */
  iconColor?: string;
  /** Font family override for the message text. */
  fontFamily?: string;
  /** Dynamic typography size override (e.g. '14px', '1rem', or a responsive object like { xs: '14px', sm: '16px' }) */
  textSize?: string | number | Record<string, string | number>;
  /** Dynamic text color. Defaults to 'text.primary'. */
  textColor?: string;
  /** Vertical alignment of items. E.g. 'center' (default) or 'flex-start' (best for multi-line text) */
  alignItems?: "center" | "flex-start";
  /** Placement of horizontal borders around the component. Default is 'both'. */
  borders?: "none" | "both" | "top" | "bottom";
  /** Divider border color. Defaults to theme's 'divider'. */
  borderColor?: string;
  /** Background color override for the banner */
  backgroundColor?: string;
  /** Vertical and horizontal padding config. E.g., '16px 0px' or responsive padding object */
  padding?: string | number | Record<string, string | number>;
  className?: string;
  sx?: SxProps<Theme>;
}

export const InfoMessage: React.FC<InfoMessageProps> = ({
  message,
  icon,
  iconSize = 20,
  iconColor = "primary.main",
  fontFamily,
  textSize = "14px",
  textColor = "text.primary",
  alignItems = "center",
  borders = "none",
  borderColor = "divider",
  backgroundColor = "transparent",
  padding = { xs: "12px 0", sm: "16px 0" },
  className,
  sx,
}) => {
  
  // Dynamic Icon Parser
  const renderIcon = () => {
    if (!icon) {
      // Default circular info vector matching the screenshot
      return (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", color: "inherit" }}
        >
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path d="M12 16V12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="12" cy="8" r="1.25" fill="white" />
        </svg>
      );
    }

    // 1. If path string is passed (e.g. a PNG/SVG URL source)
    if (typeof icon === "string") {
      return (
        <Box
          component="img"
          src={icon}
          alt="info icon"
          sx={{
            width: iconSize,
            height: iconSize,
            objectFit: "contain",
            display: "block",
          }}
        />
      );
    }

    // 2. If it is already an instantiated React Element (e.g. <MailIcon /> or custom SVG tag)
    if (React.isValidElement(icon)) {
      return (
        <Box
          sx={{
            width: iconSize,
            height: iconSize,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& svg": {
              width: "100%",
              height: "100%",
            },
          }}
        >
          {icon}
        </Box>
      );
    }

    // 3. If it is a React component class or functional component reference
    if (typeof icon === "function" || typeof icon === "object") {
      const IconComponent = icon as any;
      return (
        <IconComponent
          style={{ width: iconSize, height: iconSize }}
          sx={{ fontSize: iconSize, color: "inherit" }}
        />
      );
    }

    // Direct fallback
    return <>{icon}</>;
  };

  return (
    <Box
      className={className}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: alignItems,
        backgroundColor: backgroundColor,
        padding: padding,
        
        // Borders configurations
        borderTop: borders === "both" || borders === "top" ? `1px solid` : "none",
        borderBottom: borders === "both" || borders === "bottom" ? `1px solid` : "none",
        borderColor: borderColor,

        // Transition for responsive size scaling
        transition: "all 0.2s ease-in-out",
        ...sx,
      }}
    >
      <Box
        sx={{
          mr: 1.5, // Spacing from image screenshot
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: iconColor,
        }}
      >
        {renderIcon()}
      </Box>

      <Typography
        variant="body2"
        sx={{
          fontFamily: fontFamily,
          fontSize: textSize,
          color: textColor,
          fontWeight: 400,
          lineHeight: 1.45,
          wordBreak: "break-word",
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};
