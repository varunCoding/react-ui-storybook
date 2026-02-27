import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./TextInput";

const meta = {
  title: "Forms/TextInput",
  component: TextInput,
  tags: ["autodocs"],
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
