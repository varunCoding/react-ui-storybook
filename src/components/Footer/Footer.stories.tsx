import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from "./Footer";

const meta = {
  title: "Layout/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColors: Story = {
  args: {
    sx: { bgcolor: "#1a1a1a" }, // Easily pass a dark mode or brand color override
  },
};
