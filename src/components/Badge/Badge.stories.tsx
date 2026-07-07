import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ p: 4, bgcolor: "background.default", display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Active style matching screenshot
export const Default: Story = {
  args: {
    label: "Active",
  },
};

// Success Green style badge
export const Success: Story = {
  args: {
    label: "Recommended",
    backgroundColor: "#e8f5e9",
    textColor: "#2e7d32",
  },
};

// Warning Orange/Yellow badge
export const Warning: Story = {
  args: {
    label: "Pending",
    backgroundColor: "#fff3e0",
    textColor: "#e65100",
  },
};

// Error Red style badge
export const Error: Story = {
  args: {
    label: "Inactive",
    backgroundColor: "#ffebee",
    textColor: "#c62828",
  },
};

// Custom Typography adjustments
export const CustomTypography: Story = {
  args: {
    label: "Custom Font & Size",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "'Courier New', Courier, monospace",
    backgroundColor: "#f5f5f5",
    textColor: "#424242",
    borderRadius: "12px",
    padding: "6px 16px",
  },
};
