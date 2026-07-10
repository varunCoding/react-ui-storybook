import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Typography, Button, TextField } from "@mui/material";
import { CustomCard } from "./CustomCard";

const meta = {
  title: "Components/CustomCard",
  component: CustomCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: "background.default", maxWidth: "800px", mx: "auto" }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof CustomCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Simple Card rendering children directly with default styling
export const Default: Story = {
  args: {
    padding: "24px",
    children: (
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
          Simple Reusable Card
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          This card acts as a generic wrapper. You can pass any component or elements directly as children,
          and they will render without any hardcoded structural items or forced headers.
        </Typography>
      </Box>
    ),
  },
};

// 2. Custom style modifications (different backgrounds, borders, padding)
export const MoldedStyles: Story = {
  args: {
    backgroundColor: "#f0fdf4", // Soft green
    borderColor: "#bbf7d0", // Light green border
    borderWidth: "2px",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
    children: (
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#166534", mb: 1 }}>
          Molded Custom Design
        </Typography>
        <Typography variant="body2" sx={{ color: "#14532d" }}>
          By passing custom styling props (backgroundColor, borderColor, borderWidth, padding, etc.), you can
          instantly morph the card design to fit your project requirements.
        </Typography>
      </Box>
    ),
  },
};

// 3. Complete custom form layout inside CustomCard to show composition
export const NestedFormLayout: Story = {
  args: {
    padding: "40px",
    borderRadius: "12px",
    borderColor: "#e2e8f0",
    children: (
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
            Subscribe to Newsletter
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Get the latest updates sent directly to your inbox.
          </Typography>
        </Box>
        <TextField
          label="Email Address"
          variant="outlined"
          placeholder="email@example.com"
          fullWidth
        />
        <Button
          variant="contained"
          size="large"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 600,
            py: 1.5,
          }}
        >
          Subscribe
        </Button>
      </Box>
    ),
  },
};
