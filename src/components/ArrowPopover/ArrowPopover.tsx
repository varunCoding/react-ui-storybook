import React from "react";
import { Box, Typography, IconButton, Popper, type SxProps, type Theme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface ArrowPopoverProps {
  /** Controlling visibility of the popover */
  open: boolean;
  /** HTML anchor element the popover aligns to */
  anchorEl: HTMLElement | null;
  /** Click callback for the close "x" icon button */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Whether to display the close "x" icon button. Default is true. */
  showCloseIcon?: boolean;
  /** Optional bold title node */
  title?: React.ReactNode;
  /** Main body description content */
  content: React.ReactNode;
  /** Direction placement relative to anchor: top, bottom, left, right (and variants). Default is 'top'. */
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
  /** Optional custom width (e.g., '320px', 300) */
  width?: string | number;
  /** Optional custom height (e.g., 'auto', '200px') */
  height?: string | number;
  /** Background color override. Defaults to soft warm cream '#fffbeb' matching design. */
  backgroundColor?: string;
  /** Border color override. Defaults to soft gold-grey '#e5dfc5' matching design. */
  borderColor?: string;
  /** Custom CSS class name for styling overrides */
  className?: string;
  /** Material-UI theme system style overrides */
  sx?: SxProps<Theme>;
}

export const ArrowPopover: React.FC<ArrowPopoverProps> = ({
  open,
  anchorEl,
  onClose,
  showCloseIcon = true,
  title,
  content,
  placement = "top",
  width,
  height,
  backgroundColor = "#fffbeb",
  borderColor = "#e5dfc5",
  className,
  sx,
}) => {
  const finalBgColor = backgroundColor;
  const finalBorderColor = borderColor;

  // Determine general placement side for positioning the arrow
  const getArrowStyle = (currentPlacement: string) => {
    const baseArrowStyle: SxProps<Theme> = {
      position: "absolute",
      width: 10,
      height: 10,
      bgcolor: finalBgColor,
      border: "1px solid",
      borderColor: finalBorderColor,
      transform: "rotate(45deg)",
      zIndex: 1, // Sits above parent border to mask the joint line
    };

    if (currentPlacement.startsWith("top")) {
      return {
        ...baseArrowStyle,
        bottom: -6,
        borderTop: "none",
        borderLeft: "none",
        ...(currentPlacement.endsWith("start")
          ? { left: 20 }
          : currentPlacement.endsWith("end")
          ? { right: 20 }
          : { left: "50%", transform: "translateX(-50%) rotate(45deg)" }),
      };
    }

    if (currentPlacement.startsWith("bottom")) {
      return {
        ...baseArrowStyle,
        top: -6,
        borderBottom: "none",
        borderRight: "none",
        ...(currentPlacement.endsWith("start")
          ? { left: 20 }
          : currentPlacement.endsWith("end")
          ? { right: 20 }
          : { left: "50%", transform: "translateX(-50%) rotate(45deg)" }),
      };
    }

    if (currentPlacement.startsWith("left")) {
      return {
        ...baseArrowStyle,
        right: -6,
        borderBottom: "none",
        borderLeft: "none",
        ...(currentPlacement.endsWith("start")
          ? { top: 15 }
          : currentPlacement.endsWith("end")
          ? { bottom: 15 }
          : { top: "50%", transform: "translateY(-50%) rotate(45deg)" }),
      };
    }

    if (currentPlacement.startsWith("right")) {
      return {
        ...baseArrowStyle,
        left: -6,
        borderTop: "none",
        borderRight: "none",
        ...(currentPlacement.endsWith("start")
          ? { top: 15 }
          : currentPlacement.endsWith("end")
          ? { bottom: 15 }
          : { top: "50%", transform: "translateY(-50%) rotate(45deg)" }),
      };
    }

    return baseArrowStyle;
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      disablePortal={false}
      modifiers={[
        {
          name: "preventOverflow",
          options: {
            boundary: "clippingParents",
          },
        },
        {
          name: "offset",
          options: {
            offset: [0, 10], // Offset margin to leave space for the arrow pointer
          },
        },
      ]}
      style={{ zIndex: 1400 }}
    >
      <Box
        className={className}
        sx={{
          position: "relative",
          bgcolor: finalBgColor,
          border: "1px solid",
          borderColor: finalBorderColor,
          borderRadius: "8px",
          p: 2.5,
          boxShadow: "none", // Explicitly no shadows as requested
          width: width || "auto",
          height: height || "auto",
          maxWidth: { xs: "280px", sm: "400px" }, // Responsive maximum width limits
          boxSizing: "border-box",
          ...sx,
        }}
      >
        {/* Pointer Arrow */}
        <Box sx={getArrowStyle(placement)} />

        {/* Close Button "x" */}
        {showCloseIcon && (
          <IconButton
            size="small"
            onClick={(e) => onClose?.(e)}
            aria-label="close popover"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "text.secondary",
              "&:hover": {
                color: "text.primary",
              },
            }}
          >
            <CloseIcon fontSize="small" sx={{ fontSize: "16px" }} />
          </IconButton>
        )}

        {/* Title */}
        {title && (
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              pr: showCloseIcon ? 3.5 : 0, // Padding to avoid overlap with close icon
              mb: 1,
              fontSize: "14px",
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>
        )}

        {/* Content Body */}
        {typeof content === "string" ? (
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "13px",
              lineHeight: 1.45,
            }}
          >
            {content}
          </Typography>
        ) : (
          content
        )}
      </Box>
    </Popper>
  );
};
