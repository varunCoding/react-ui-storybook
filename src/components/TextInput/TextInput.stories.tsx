import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { TextInput } from "./TextInput";

// Create a custom theme just for testing how TextInput absorbs it
const testTheme = createTheme({
  palette: {
    primary: {
      main: "#8e24aa", // A distinct purple to prove theming works
    },
    error: {
      main: "#d32f2f", 
    },
    background: {
      paper: "#fdfdfd",
    }
  },
  shape: {
    borderRadius: 12,
  }
});

const meta = {
  title: "Forms/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider theme={testTheme}>
        <Box sx={{ p: 4, maxWidth: "400px", bgcolor: "#f5f5f5", borderRadius: 4 }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Text
export const DefaultText: Story = {
  args: {
    label: "Full Name",
    placeholder: "John Doe",
  },
};

// Automatically adds the Email Icon
export const EmailVariant: Story = {
  args: {
    label: "Email Address",
    type: "email",
    placeholder: "john.doe@example.com",
    required: true,
  },
};

// Automatically adds the Phone Icon
export const PhoneVariant: Story = {
  args: {
    label: "Phone Number",
    type: "tel",
    placeholder: "(555) 123-4567",
    insuranceContext: "We may contact you via SMS regarding your application.",
  },
};

// Automatically adds the Show/Hide Password Toggle
export const PasswordVariant: Story = {
  args: {
    label: "Account Password",
    type: "password",
    placeholder: "Enter a secure password",
    required: true,
  },
};

// Error Validation Variant provided from props
export const ErrorVariant: Story = {
  args: {
    label: "Error State (Prop Controlled)",
    type: "email",
    placeholder: "john.doe@example.com",
    required: true,
    error: true,
    helperText: "This error is forced via props.",
  },
};

// Showcases built-in validation (on blur / change)
export const AutoValidation: Story = {
  args: {
    label: "Auto Validate Email (Blur to test)",
    type: "email",
    placeholder: "invalid-email",
    required: true,
  },
};

// Showcases a custom validation function
export const CustomValidation: Story = {
  args: {
    label: "Username (Must be 5+ chars)",
    placeholder: "user",
    validate: (val) => {
      if (val.length < 5) return "Username must be at least 5 characters.";
      return undefined;
    },
  },
};

