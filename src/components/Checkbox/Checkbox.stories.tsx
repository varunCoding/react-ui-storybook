import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ p: 4, maxWidth: "400px", bgcolor: "background.default", borderRadius: 4 }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Checkbox
export const Default: Story = {
  args: {
    label: "I agree to the terms and conditions",
  },
};

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: "Receive marketing emails",
    helperText: "We will only send you relevant updates and you can unsubscribe at any time.",
  },
};

// Required
export const Required: Story = {
  args: {
    label: "I accept the Privacy Policy",
    required: true,
  },
};

// Error State (Prop Controlled)
export const ErrorState: Story = {
  args: {
    label: "Verify your email subscription preference",
    error: true,
    helperText: "You must choose an option before proceeding.",
  },
};

// Disabled Checked & Unchecked
export const DisabledUnchecked: Story = {
  args: {
    label: "Auto-renew membership (Disabled)",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Subscribed to newsletter (Disabled)",
    checked: true,
    disabled: true,
  },
};

// Indeterminate state
export const Indeterminate: Story = {
  args: {
    label: "Parent category selection",
    indeterminate: true,
  },
};

// Showcases built-in validation (on blur / change)
export const AutoValidation: Story = {
  args: {
    label: "Validate selection (Uncheck and blur to trigger)",
    required: true,
    checked: true,
  },
};

// Custom validation function (e.g. required checkbox with a custom message)
export const CustomValidation: Story = {
  args: {
    label: "Agree to terms (Custom validation message)",
    required: true,
    validate: (checked) => {
      if (!checked) return "Custom error: You cannot proceed without agreeing.";
      return undefined;
    },
  },
};
