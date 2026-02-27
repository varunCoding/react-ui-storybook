import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Container,
  type SxProps,
  type Theme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Logo } from "../Logo/Logo";

export interface HeaderProps {
  navLinks?: { label: string; href: string }[];
  onLoginClick?: () => void;
  sx?: SxProps<Theme>;
}

export const Header: React.FC<HeaderProps> = ({
  navLinks = [
    { label: "Plans", href: "#" },
    { label: "Find a Doctor", href: "#" },
    { label: "Claims", href: "#" },
  ],
  onLoginClick,
  sx,
}) => {
  return (
    <AppBar position="static" color="inherit" elevation={1} sx={sx}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Logo />

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {navLinks.map((link) => (
              <Button key={link.label} color="inherit" href={link.href}>
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Desktop Actions */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button variant="contained" color="primary" onClick={onLoginClick}>
              Member Login
            </Button>
          </Box>

          {/* Mobile Hamburger Menu */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
