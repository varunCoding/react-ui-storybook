import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  type SxProps,
  type Theme,
} from "@mui/material";

export interface PlanCardStat {
  /** The value of the stat, e.g. '$1,000' */
  value: string;
  /** The descriptive label of the stat, e.g. 'Annual maximum' */
  label: string;
}

export interface PlanCardProps {
  /** The main large title, e.g., 'Cigna Dental Premium' */
  title: React.ReactNode;
  /** Small pre-title text rendered in uppercase, e.g., 'YOUR PLAN' */
  overline?: React.ReactNode;
  /** Badge content displayed next to the overline, e.g., 'Active' */
  badge?: React.ReactNode;
  /** Subtitle text, e.g., 'Effective date: 05/01/2026' */
  subtitle?: React.ReactNode;
  /** Action element on the right (e.g. PillButton) */
  headerAction?: React.ReactNode;
  /** Array of metrics statistics */
  stats?: PlanCardStat[];
  /** Inline InfoMessage component */
  infoMessage?: React.ReactNode;
  /** Custom accordion title, e.g. 'Plan details' */
  accordionTitle?: React.ReactNode;
  /** Accordion content node */
  accordionContent?: React.ReactNode;
  /** Default accordion expanded state */
  accordionDefaultExpanded?: boolean;
  /** Card border radius override (default is '24px') */
  borderRadius?: string | number;
  /** Card border color override (default is 'divider') */
  borderColor?: string;
  /** Card border width override (default is '1.5px') */
  borderWidth?: string | number;
  /** Custom children rendering allowing users to insert other custom sections in the card */
  children?: React.ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
}

// Custom simple angle arrow icon for accordion header matching design
const SimpleChevronDown: React.FC = () => (
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

export const PlanCard: React.FC<PlanCardProps> = ({
  title,
  overline,
  badge,
  subtitle,
  headerAction,
  stats = [],
  infoMessage,
  accordionTitle = "Plan details",
  accordionContent,
  accordionDefaultExpanded = false,
  borderRadius = "24px",
  borderColor = "divider",
  borderWidth = "1.5px",
  children,
  className,
  sx,
}) => {
  return (
    <Card
      className={className}
      elevation={0}
      sx={{
        borderRadius: borderRadius,
        border: `${borderWidth} solid`,
        borderColor: borderColor,
        backgroundColor: "background.paper",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        overflow: "visible", // Allows dropdown menus/hover actions to render properly
        width: "100%",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, sm: 4 }, pb: 0 }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "flex-start" },
            gap: 2,
            mb: 2.5,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {/* Overline & Badge */}
            {(overline || badge) && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
                {typeof overline === "string" ? (
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "text.secondary",
                    }}
                  >
                    {overline}
                  </Typography>
                ) : (
                  overline
                )}
                {typeof badge === "string" ? (
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      bgcolor: "rgba(0, 91, 159, 0.08)",
                      color: "primary.main",
                      px: 1.25,
                      py: 0.25,
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {badge}
                  </Box>
                ) : (
                  badge
                )}
              </Box>
            )}

            {/* Main Title */}
            {typeof title === "string" ? (
              <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}>
                {title}
              </Typography>
            ) : (
              title
            )}

            {/* Subtitle / Effective Date */}
            {subtitle && (
              <Box sx={{ mt: 0.75 }}>
                {typeof subtitle === "string" ? (
                  <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                    {subtitle}
                  </Typography>
                ) : (
                  subtitle
                )}
              </Box>
            )}
          </Box>

          {headerAction && (
            <Box
              sx={{
                width: { xs: "100%", sm: "auto" },
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {headerAction}
            </Box>
          )}
        </Box>

        {/* Divider below header if stats are present */}
        {stats.length > 0 && <Divider sx={{ mb: 2.5 }} />}

        {/* Stats Section */}
        {stats.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "stretch",
              justifyContent: "space-between",
              width: "100%",
              mb: 2.5,
              gap: 2.5,
            }}
          >
            {stats.map((stat, index) => (
              <Box
                key={index}
                sx={{
                  flex: 1, // Distributes space equally, ensuring items fill 100% of the card width collectively
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "24px", sm: "28px" },
                    fontWeight: 800,
                    color: "text.primary",
                    lineHeight: 1.15,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                    fontSize: "13px",
                    mt: 0.5,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Divider below stats if other content exists */}
        {stats.length > 0 && (children || infoMessage) && <Divider sx={{ mb: 2.5 }} />}

        {/* Custom children sections inserted dynamically */}
        {children && <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mb: 2.5 }}>{children}</Box>}

        {/* Info Message Banner */}
        {infoMessage && (
          <Box sx={{ mb: 2.5 }}>
            {infoMessage}
          </Box>
        )}

        {/* Accordion / Expandable Plan Details */}
        {accordionContent && (
          <Box sx={{ width: "100%" }}>
            <Divider sx={{ mb: 1 }} />
            <Accordion
              defaultExpanded={accordionDefaultExpanded}
              elevation={0}
              disableGutters
              sx={{
                backgroundColor: "transparent",
                backgroundImage: "none",
                borderRadius: `0 0 ${typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius} !important`,
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<SimpleChevronDown />}
                sx={{
                  px: 0, // Aligns perfectly with the left and right bounds of the CardContent padding
                  py: 1.5,
                  minHeight: 56,
                  "&.Mui-expanded": { minHeight: 56 },
                  "& .MuiAccordionSummary-content": { m: 0 },
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    color: "primary.main",
                    transition: "transform 0.25s ease",
                    "&.Mui-expanded": {
                      color: "primary.main",
                    },
                  },
                }}
              >
                {typeof accordionTitle === "string" ? (
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "text.primary",
                    }}
                  >
                    {accordionTitle}
                  </Typography>
                ) : (
                  accordionTitle
                )}
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: 0, // Aligns perfectly with the left and right bounds of the CardContent padding
                  pt: 0.5,
                  pb: 4,
                  backgroundColor: "transparent",
                }}
              >
                {accordionContent}
              </AccordionDetails>
            </Accordion>
          </Box>
        )}
      </CardContent>



    </Card>
  );
};
