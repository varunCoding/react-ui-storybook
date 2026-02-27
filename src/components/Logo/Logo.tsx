import React from "react";
import { Typography, Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

export interface LogoProps {
  companyName?: string;
  variant?: "light" | "dark";
  sx?: SxProps<Theme>;
}

export const Logo: React.FC<LogoProps> = ({
  companyName = "HealthCare Plus",
  variant = "dark",
  sx,
}) => {
  const color = variant === "dark" ? "primary.main" : "common.white";

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, ...sx }}>
      <HealthAndSafetyIcon sx={{ color, fontSize: { xs: 24, md: 32 } }} />
      <Typography
        variant="h6"
        sx={{
          color,
          fontWeight: "bold",
          fontSize: { xs: "1.2rem", md: "1.5rem" }, // Responsive font size
        }}
      >
        {companyName}
      </Typography>
    </Box>
  );
};
