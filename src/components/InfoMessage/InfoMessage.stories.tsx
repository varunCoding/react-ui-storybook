import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Paper } from "@mui/material";
import { InfoMessage } from "./InfoMessage";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const meta = {
  title: "Components/InfoMessage",
  component: InfoMessage,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Paper elevation={0} sx={{ p: 4, bgcolor: "background.default", maxWidth: "800px" }}>
        <Story />
      </Paper>
    ),
  ],
} satisfies Meta<typeof InfoMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default display (No borders and transparent background by default)
export const Default: Story = {
  args: {
    message: "Your waiting period for [benefit(s)] has been waived.",
  },
};

// Mirroring the look with borders
export const WithBorders: Story = {
  args: {
    message: "Your waiting period for [benefit(s)] has been waived.",
    borders: "both",
  },
};

// Larger custom typography size and distinct font family
export const CustomTypography: Story = {
  args: {
    message: "Important notification: The scheduled maintenance window begins tonight at 11:00 PM EST.",
    textSize: "18px",
    fontFamily: "'Courier New', Courier, monospace",
    textColor: "#d32f2f", // Custom red text
    borders: "both",
  },
};

// Using an MUI component icon (e.g., CheckCircleIcon)
export const CustomReactIcon: Story = {
  args: {
    message: "Successfully synchronized your active profile settings.",
    icon: CheckCircleIcon,
    iconColor: "success.main",
    iconSize: 22,
    borders: "bottom",
  },
};

// Using an instantiated React element (e.g., EmailIcon)
export const CustomReactElementIcon: Story = {
  args: {
    message: "You have 3 unread messages in your insurance inbox.",
    icon: <EmailIcon sx={{ color: "warning.main" }} />,
    borders: "none",
  },
};

// Demo using an image path URL (e.g. mimicking a PNG or SVG icon path)
export const ImageUrlIcon: Story = {
  args: {
    message: "This info component renders a PNG or SVG image loaded from an assets URL path.",
    icon: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Infobox_info_icon.svg",
    iconSize: 24,
    borders: "both",
  },
};

// Responsive Text sizing demo: Smaller font on mobile screens, larger on desktop
export const ResponsiveTextSize: Story = {
  args: {
    message: "This font dynamically resizes from 13px (mobile) to 18px (desktop). Try changing your browser width!",
    textSize: { xs: "13px", md: "18px" },
    iconSize: 22,
    borders: "both",
  },
};

// Aligning to the top (flex-start) for long multi-line paragraphs
export const MultiLineTopAligned: Story = {
  args: {
    message: (
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium " +
      "orci at urna sodales, sit amet rhoncus nibh convallis. Proin rhoncus ipsum " +
      "quis lectus tempor efficitur. Integer nec erat interdum, molestie sapien et, " +
      "iaculis est. Cras aliquet, metus sit amet scelerisque imperdiet, libero nulla " +
      "volutpat justo, id commodo turpis ex non urna."
    ),
    alignItems: "flex-start",
    borders: "both",
  },
};
