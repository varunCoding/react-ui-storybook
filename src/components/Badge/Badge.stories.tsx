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

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// Badge showing an icon on the left of label text
export const WithCheckIcon: Story = {
  args: {
    label: "Active",
    icon: <CheckIcon />,
  },
};

// Badge showing a warning/info icon with a light-blue theme
export const WithInfoIcon: Story = {
  args: {
    label: "Pending Verification",
    icon: <InfoIcon />,
    backgroundColor: "#e0f2fe", // soft blue background
    textColor: "#0369a1", // dark blue text
  },
};
