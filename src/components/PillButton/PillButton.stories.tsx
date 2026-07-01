import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Typography } from "@mui/material";
import { PillButton } from "./PillButton";

const meta = {
  title: "Components/PillButton",
  component: PillButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ p: 4, bgcolor: "background.default", borderRadius: 4 }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof PillButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Outline Button (like Manage members)
export const Default: Story = {
  args: {
    label: "Manage members",
    variant: "outlined",
  },
};

// Outline Button with Chevron (like Manage plan)
export const WithDropdown: Story = {
  args: {
    label: "Manage plan",
    showDropdownIcon: true,
    variant: "outlined",
  },
};

// Contained (Filled) variant
export const Contained: Story = {
  args: {
    label: "Save Changes",
    variant: "contained",
  },
};

// Disabled states
export const DisabledOutlined: Story = {
  args: {
    label: "Manage members (Disabled)",
    disabled: true,
    variant: "outlined",
  },
};

export const DisabledContained: Story = {
  args: {
    label: "Submit Plan (Disabled)",
    disabled: true,
    variant: "contained",
  },
};

// Responsive mobile demonstration inside a mockup Card container
export const ResponsiveCardMockup: Story = {
  render: (args) => (
    <Box
      sx={{
        width: "100%",
        maxWidth: "600px",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "16px",
        p: 3,
        bgcolor: "background.paper",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        Membership Settings
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
        Manage your active subscriptions, change billing dates, or invite new team members.
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          // Shrink width of this container to test responsive flow
          width: "100%",
        }}
      >
        <PillButton {...args} />
      </Box>
      <Typography variant="caption" display="block" sx={{ color: "text.disabled", mt: 2, textAlign: "center" }}>
        💡 Resize the viewport to see this button span 100% width on screen width &lt; 600px (mobile)
      </Typography>
    </Box>
  ),
  args: {
    label: "Manage plan",
    showDropdownIcon: true,
    responsiveFullWidth: true,
  },
};
