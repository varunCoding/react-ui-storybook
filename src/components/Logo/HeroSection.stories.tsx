import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeroSection } from "./HeroSection";

const meta = {
  title: "Components/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onCtaClick: { action: "clicked" },
  },
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SplitLayout: Story = {
  args: {
    title: "Protect Your Health, Protect Your Future",
    subtitle:
      "Affordable and comprehensive health insurance plans tailored for you and your family. Get covered today in minutes.",
    ctaText: "Get a Quote",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
  },
};

export const CenteredLayout: Story = {
  args: {
    title: "Healthcare Made Simple",
    subtitle:
      "Join millions of satisfied members who trust us with their health coverage. Simple plans, transparent pricing.",
    ctaText: "Start Now",
    variant: "centered",
  },
};
