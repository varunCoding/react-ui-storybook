import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlanCard } from "./PlanCard";

const meta = {
  title: "Components/PlanCard",
  component: PlanCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onSelect: { action: "selected" },
  },
} satisfies Meta<typeof PlanCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    planName: "Basic Health",
    price: "$29",
    features: [
      "Primary Care Visits",
      "Generic Prescriptions",
      "24/7 Telehealth Support",
    ],
  },
};

export const Recommended: Story = {
  args: {
    planName: "Premium Care",
    price: "$99",
    features: [
      "All Basic Features",
      "Specialist Visits Included",
      "Dental & Vision Coverage",
      "$0 Deductible Options",
    ],
    isRecommended: true,
  },
};
