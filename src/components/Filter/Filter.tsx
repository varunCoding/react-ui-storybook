import React, { useState } from "react";
import {
  Box,
  Typography,
  Collapse,
  useTheme,
  useMediaQuery,
  type SxProps,
  type Theme,
} from "@mui/material";
import { Dropdown } from "../Dropdown";
import { DatePicker } from "../DatePicker";
import { TextInput } from "../TextInput/TextInput";
import { PillButton } from "../PillButton";

export interface FilterOption {
  label: string;
  value: any;
}

export interface FilterField {
  id: string;
  label: string;
  type: "select" | "date" | "text" | "custom";
  placeholder?: string;
  options?: FilterOption[];
  /** Optional custom renderer for custom fields */
  render?: (value: any, onChange: (val: any) => void) => React.ReactNode;
}

export interface FilterProps {
  /** Array of filter field definitions */
  fields: FilterField[];
  /** Controlled filter values object: e.g. { status: 'All', start: null } */
  value?: Record<string, any>;
  /** Callback triggered when active filter values change internally */
  onChange?: (values: Record<string, any>) => void;
  /** Callback triggered when Apply button is clicked */
  onApply?: (values: Record<string, any>) => void;
  /** Callback triggered when Clear all button is clicked */
  onClear?: () => void;
  /** Explicit override for the active filter count. If not passed, computed automatically based on non-empty values. */
  activeCount?: number;
  className?: string;
  sx?: SxProps<Theme>;
}

// Chevron SVGs matching design system arrow icons
const ChevronDown: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transition: "transform 0.2s" }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronUp: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transition: "transform 0.2s" }}
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

export const Filter: React.FC<FilterProps> = ({
  fields = [],
  value: controlledValue,
  onChange,
  onApply,
  onClear,
  activeCount: propActiveCount,
  className,
  sx,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Track expanded state for mobile collapsible card
  const [isExpanded, setIsExpanded] = useState(false);

  // Uncontrolled state fallback
  const [localValues, setLocalValues] = useState<Record<string, any>>({});
  const currentValues = controlledValue !== undefined ? controlledValue : localValues;

  const handleFieldChange = (fieldId: string, newValue: any) => {
    const updated = {
      ...currentValues,
      [fieldId]: newValue,
    };
    if (controlledValue === undefined) {
      setLocalValues(updated);
    }
    if (onChange) {
      onChange(updated);
    }
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (onApply) {
      onApply(currentValues);
    }
  };

  const handleClear = () => {
    const cleared: Record<string, any> = {};
    fields.forEach((field) => {
      cleared[field.id] = field.type === "select" ? "All" : "";
    });
    if (controlledValue === undefined) {
      setLocalValues(cleared);
    }
    if (onChange) {
      onChange(cleared);
    }
    if (onClear) {
      onClear();
    }
  };

  // Compute active filters count automatically if not explicitly provided
  const activeCount =
    propActiveCount !== undefined
      ? propActiveCount
      : Object.entries(currentValues).filter(([_, val]) => {
          if (val === "" || val === null || val === undefined || val === "All") {
            return false;
          }
          return true;
        }).length;

  const renderField = (field: FilterField) => {
    const fieldValue = currentValues[field.id] !== undefined ? currentValues[field.id] : "";

    if (field.render) {
      return field.render(fieldValue, (val) => handleFieldChange(field.id, val));
    }

    const fieldSx = {
      "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        height: "48px",
      },
    };

    switch (field.type) {
      case "select":
        return (
          <Dropdown
            label={field.label}
            options={field.options || []}
            value={fieldValue}
            onChange={(val) => handleFieldChange(field.id, val)}
            sx={fieldSx}
          />
        );
      case "date":
        return (
          <DatePicker
            label={field.label}
            value={fieldValue instanceof Date ? fieldValue : fieldValue ? new Date(fieldValue) : null}
            onChange={(date) => handleFieldChange(field.id, date)}
            sx={fieldSx}
          />
        );
      case "text":
      default:
        return (
          <TextInput
            label={field.label}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            value={fieldValue}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            sx={fieldSx}
          />
        );
    }
  };

  // Render Desktop Layout (Horizontal single-line row of filters)
  const renderDesktop = () => (
    <Box
      component="form"
      onSubmit={handleApply}
      className={className}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 2,
        width: "100%",
        bgcolor: "#f8fafc",
        border: "1.5px solid",
        borderColor: "divider",
        borderRadius: "20px",
        p: 3,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.02)",
        overflowX: "auto", // Ensure it scrolls horizontally if viewport slightly shrinks, keeping it in one line
        scrollbarWidth: "none", // Hide scrollbars for premium look
        "&::-webkit-scrollbar": { display: "none" },
        ...sx,
      }}
    >
      {fields.map((field) => (
        <Box key={field.id} sx={{ flex: 1, minWidth: "140px" }}>
          {renderField(field)}
        </Box>
      ))}

      {/* Desktop Actions Block */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2, py: 0.5, flexShrink: 0 }}>
        <PillButton label="Apply" variant="contained" type="submit" />
        {activeCount > 0 && (
          <PillButton
            label={`Clear all (${activeCount})`}
            variant="text"
            onClick={handleClear}
            sx={{ px: 1, color: "text.secondary" }}
          />
        )}
      </Box>
    </Box>
  );

  // Render Mobile Layout (Static header bar with toggling white tab button and collapsible white body card)
  const renderMobile = () => (
    <Box
      className={className}
      sx={{
        width: "100%",
        border: "1.5px solid",
        borderColor: "divider",
        borderRadius: "20px",
        overflow: "hidden",
        bgcolor: "#ffffff",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.03)",
        ...sx,
      }}
    >
      {/* Header Bar Container (Always Visible) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: "56px",
          bgcolor: "#e2e8f0", // Light grey/blue header bar background
          borderBottom: isExpanded ? "1.5px solid" : "none",
          borderColor: "divider",
          px: 2, // Margins on sides for the button
        }}
      >
        {/* White Pill Toggle Button (Centered vertically, offset from edges) */}
        <Box
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            height: "36px",
            px: 2.5,
            bgcolor: "#ffffff", // White pill background
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "9999px", // Pill shape matching mockup
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)",
            cursor: "pointer",
            transition: "all 0.15s ease",
            "&:hover": {
              bgcolor: "#f8fafc",
              borderColor: "primary.main",
            },
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "primary.main", fontSize: "14px" }}
          >
            {isExpanded ? "Filters" : `Filters ${activeCount > 0 ? `(${activeCount})` : ""}`}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", color: "primary.main" }}>
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </Box>
        </Box>
      </Box>

      {/* Collapsible Card Body (White background) */}
      <Collapse in={isExpanded}>
        <Box
          component="form"
          onSubmit={handleApply}
          sx={{
            bgcolor: "#ffffff",
            p: 3,
          }}
        >
          {/* Vertical fields stack */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mb: 3.5 }}>
            {fields.map((field) => (
              <Box key={field.id} sx={{ width: "100%" }}>
                {renderField(field)}
              </Box>
            ))}
          </Box>

          {/* Action buttons footer */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, alignItems: "center" }}>
            <PillButton label="Apply" variant="contained" type="submit" sx={{ width: "100%" }} />
            {activeCount > 0 && (
              <PillButton
                label={`Clear all (${activeCount})`}
                variant="text"
                onClick={handleClear}
                sx={{
                  color: "text.secondary",
                  textDecoration: "underline",
                  fontSize: "14px",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "primary.main",
                  },
                }}
              />
            )}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );

  return isMobile ? renderMobile() : renderDesktop();
};

export default Filter;
