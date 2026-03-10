import React from "react";
import { Box, Container, Typography, Button, Grid, Stack } from "@mui/material";

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick?: () => void;
  imageUrl?: string;
  variant?: "centered" | "split";
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  onCtaClick,
  imageUrl,
  variant = "split",
}) => {
  if (variant === "centered") {
    return (
      <Box
        sx={{
          bgcolor: "background.paper",
          py: { xs: 8, md: 12 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            fontWeight="800"
            sx={{ fontSize: { xs: "2.5rem", md: "3.75rem" } }}
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            paragraph
            sx={{ mb: 4 }}
          >
            {subtitle}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" size="large" onClick={onCtaClick}>
              {ctaText}
            </Button>
            <Button variant="outlined" size="large">
              Learn More
            </Button>
          </Stack>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.paper", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Stack spacing={3} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Typography
                variant="h2"
                component="h1"
                fontWeight="800"
                sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
              >
                {title}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {subtitle}
              </Typography>
              <Button variant="contained" size="large" onClick={onCtaClick}>
                {ctaText}
              </Button>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src={imageUrl || "https://via.placeholder.com/600x400"}
              alt="Hero Illustration"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 4,
                boxShadow: 3,
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
