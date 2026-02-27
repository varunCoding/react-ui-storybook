import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  type SxProps,
  type Theme,
} from "@mui/material";
import { Logo } from "../Logo/Logo";

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps {
  companyName?: string;
  description?: string;
  linkGroups?: FooterLinkGroup[];
  legalText?: string;
  sx?: SxProps<Theme>;
}

export const Footer: React.FC<FooterProps> = ({
  companyName = "HealthCare Plus",
  description = "Providing comprehensive and affordable health insurance plans for you and your family.",
  linkGroups = [
    {
      title: "Our Plans",
      links: [
        { label: "Individual & Family", href: "#" },
        { label: "Medicare", href: "#" },
        { label: "Employers", href: "#" },
      ],
    },
    {
      title: "Members",
      links: [
        { label: "Member Portal", href: "#" },
        { label: "Find a Doctor", href: "#" },
        { label: "Submit a Claim", href: "#" },
      ],
    },
    {
      title: "About Us",
      links: [
        { label: "Company Overview", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact Support", href: "#" },
      ],
    },
  ],
  legalText = `© ${new Date().getFullYear()} HealthCare Plus. All rights reserved.`,
  sx,
}) => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "common.white",
        pt: 6,
        pb: 3,
        ...sx,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Brand & Description Column */}
          {/* Notice the new v6 "size" prop here */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Logo variant="light" companyName={companyName} sx={{ mb: 2 }} />
            <Typography
              variant="body2"
              sx={{ color: "grey.300", maxWidth: 300 }}
            >
              {description}
            </Typography>
          </Grid>

          {/* Dynamic Link Columns */}
          {linkGroups.map((group) => (
            <Grid size={{ xs: 12, sm: 4, md: 2 }} key={group.title}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                {group.title}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    color="inherit"
                    underline="hover"
                    sx={{
                      color: "grey.300",
                      "&:hover": { color: "common.white" },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4, borderColor: "primary.light" }} />

        {/* Legal & Compliance Bottom Bar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "grey.400" }}>
            {legalText}
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ color: "grey.400", fontSize: "0.875rem" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ color: "grey.400", fontSize: "0.875rem" }}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              sx={{ color: "grey.400", fontSize: "0.875rem" }}
            >
              HIPAA Compliance
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
