import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "./Logo";

const meta = {
  title: "Core/Logo",
  component: Logo,
  tags: ["autodocs"],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomName: Story = { args: { companyName: "Aetna Life" } };
