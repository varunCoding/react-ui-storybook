import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
import { Dropdown } from "./Dropdown";
import { useState } from "react";

const meta = {
  title: "Forms/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ p: 4, maxWidth: "400px", bgcolor: "background.default", borderRadius: 4 }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const standardOptions = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "uk", label: "United Kingdom" },
];

export const DefaultSingle: Story = {
  args: {
    label: "Country",
    options: standardOptions,
    placeholder: "Select a country",
  },
};

export const Multiselect: Story = {
  args: {
    label: "Interested Regions",
    options: standardOptions,
    multiple: true,
    placeholder: "Select regions",
  },
};

export const RequiredValidation: Story = {
  args: {
    label: "Country (Required)",
    options: standardOptions,
    required: true,
    placeholder: "Must select a country",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Country",
    options: standardOptions,
    error: true,
    helperText: "Invalid country selection",
    placeholder: "Select a country",
  },
};

const CustomValidationWrapper = () => {
  const [val, setVal] = useState<string>("");
  return (
    <Dropdown
      label="Select a specific country"
      options={standardOptions}
      value={val}
      onChange={setVal}
      placeholder="Select a country"
      validate={(v) => (v !== "us" ? "You must select United States" : undefined)}
    />
  );
};

export const CustomValidation: Story = {
  render: () => <CustomValidationWrapper />
};

const MultiselectRequiredWrapper = () => {
  const [val, setVal] = useState<string[]>([]);
  return (
    <Dropdown
      label="Select regions (Required)"
      options={standardOptions}
      multiple
      required
      value={val}
      onChange={setVal}
      placeholder="Select regions"
    />
  );
};

export const MultiselectRequired: Story = {
  render: () => <MultiselectRequiredWrapper />
};
