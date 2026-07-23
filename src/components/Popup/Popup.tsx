import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import { PillButton } from "../PillButton";

export interface PopupButtonProps {
  /** The text label on the button */
  label: string;
  /** Click callback for the action button */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Custom button style variant override: 'outlined' | 'contained' | 'text' */
  variant?: "outlined" | "contained" | "text";
  /** Whether the action button is disabled */
  disabled?: boolean;
}

export interface PopupProps {
  /** Controls open visibility state */
  open: boolean;
  /** Callback triggered on backdrop, escape key, or cross-icon click */
  onClose?: (
    event: {},
    reason?: "backdropClick" | "escapeKeyDown" | "closeIconClick"
  ) => void;
  /** Large bold title in the header */
  title?: React.ReactNode;
  /** Standard content text or React node inside the popup */
  content?: React.ReactNode;
  /** Custom nested children (rendered inside DialogContent below content) */
  children?: React.ReactNode;
  /** Primary / Right action button props */
  primaryButton?: PopupButtonProps;
  /** Secondary / Left action button props. Passing this activates two-button mode. */
  secondaryButton?: PopupButtonProps;
  /** Customize corner border radius (default: '24px' matching PlanCard design) */
  borderRadius?: string | number;
  /** Dialog width constraints (default: 'xs' / 480px width) */
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  className?: string;
  sx?: SxProps<Theme>;
}

const CrossIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block" }}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const Popup: React.FC<PopupProps> = ({
  open,
  onClose,
  title,
  content,
  children,
  primaryButton,
  secondaryButton,
  borderRadius = "24px",
  maxWidth = "xs",
  className,
  sx,
}) => {
  const handleCloseIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClose) {
      onClose(e, "closeIconClick");
    }
  };

  const handleDialogClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
    if (onClose) {
      onClose(event, reason);
    }
  };

  const hasFooter = !!primaryButton || !!secondaryButton;

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth={maxWidth}
      fullWidth
      className={className}
      PaperProps={{
        sx: {
          borderRadius: borderRadius,
          p: { xs: 3, sm: 4.5 },
          position: "relative",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.08)",
          mx: { xs: 2.5, sm: "auto" },
          backgroundImage: "none", // Reset background gradient layers
          backgroundColor: "background.paper",
          ...sx,
        },
      }}
    >
      {/* Close Cross Icon Button */}
      {onClose && (
        <IconButton
          onClick={handleCloseIconClick}
          aria-label="close"
          sx={{
            position: "absolute",
            right: { xs: "16px", sm: "24px" },
            top: { xs: "16px", sm: "24px" },
            color: "text.secondary",
            p: 1,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(0, 91, 159, 0.05)",
              color: "primary.main",
              transform: "rotate(90deg)",
            },
          }}
        >
          <CrossIcon />
        </IconButton>
      )}

      {/* Header Title */}
      {title && (
        <DialogTitle
          sx={{
            p: 0,
            mb: 2.5,
            fontSize: { xs: "20px", sm: "24px" },
            fontWeight: 700,
            lineHeight: 1.25,
            color: "text.primary",
            pr: onClose ? 5 : 0, // Prevent overlapping title with close button
          }}
        >
          {title}
        </DialogTitle>
      )}

      {/* Body Content */}
      {(content || children) && (
        <DialogContent
          sx={{
            p: 0,
            mb: hasFooter ? 4 : 0,
            color: "text.secondary",
            fontSize: "15px",
            lineHeight: 1.5,
          }}
        >
          {typeof content === "string" ? (
            <Typography variant="body1" sx={{ color: "inherit", fontSize: "inherit", lineHeight: "inherit" }}>
              {content}
            </Typography>
          ) : (
            content
          )}
          {children}
        </DialogContent>
      )}

      {/* Footer Action Buttons */}
      {hasFooter && (
        <DialogActions sx={{ p: 0 }}>
          <Box
            sx={{
              display: "flex",
              // Mobile stacks vertically in reverse (Primary button on top, Secondary/Cancel below it)
              // Desktop places them horizontally side-by-side (Cancel on left, Confirm on right)
              flexDirection: { xs: "column-reverse", sm: "row" },
              gap: 1.5,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Left Button (Secondary/Cancel) */}
            {secondaryButton && (
              <PillButton
                label={secondaryButton.label}
                onClick={secondaryButton.onClick}
                disabled={secondaryButton.disabled}
                // Defaults to 'text' (no background color) if variant not specified
                variant={secondaryButton.variant || "text"}
                responsiveFullWidth
                sx={{
                  // Prevent hover transitions from affecting alignment
                  alignSelf: "stretch",
                }}
              />
            )}

            {/* Right Button (Primary/Confirm) */}
            {primaryButton && (
              <PillButton
                label={primaryButton.label}
                onClick={primaryButton.onClick}
                disabled={primaryButton.disabled}
                // Defaults to 'contained' (solid primary color) if variant not specified
                variant={primaryButton.variant || "contained"}
                responsiveFullWidth
                sx={{
                  alignSelf: "stretch",
                }}
              />
            )}
          </Box>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Popup;
