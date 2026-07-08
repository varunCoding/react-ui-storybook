import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Button } from "@mui/material";
import { ArrowPopover } from "./ArrowPopover";

const meta = {
  title: "Components/ArrowPopover",
  component: ArrowPopover,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ p: 12, bgcolor: "background.default", display: "flex", justifyContent: "center" }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof ArrowPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive controls demo for live testing
export const LiveControls: Story = {
  render: (args) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "320px", pt: 6 }}>
        <Button
          ref={setAnchorEl}
          variant="contained"
          sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600 }}
        >
          Anchor Button
        </Button>
        <ArrowPopover {...args} anchorEl={anchorEl} />
      </Box>
    );
  },
  args: {
    open: true,
    title: "Live Exclusions Details",
    content: "Toggle my visibility, colors, sizes, placement, and titles directly from the Storybook Controls tab!",
    placement: "top",
    width: 320,
    height: "auto",
    backgroundColor: "#fffbeb",
    borderColor: "#e5dfc5",
    showCloseIcon: true,
  },
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top", "top-start", "top-end",
        "bottom", "bottom-start", "bottom-end",
        "left", "left-start", "left-end",
        "right", "right-start", "right-end"
      ],
    },
    backgroundColor: { control: "color" },
    borderColor: { control: "color" },
    width: { control: "text" },
    height: { control: "text" },
    open: { control: "boolean" },
    showCloseIcon: { control: "boolean" },
  }
};

// Helper component to enable interactive click-to-open toggles inside Storybook
interface InteractiveDemoProps {
  buttonLabel: string;
  title?: string;
  content: string;
  placement?: any;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  borderColor?: string;
  className?: string;
}

const InteractiveDemo: React.FC<InteractiveDemoProps> = ({
  buttonLabel,
  title,
  content,
  placement = "top",
  width,
  height,
  backgroundColor,
  borderColor,
  className,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  
  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Button
        variant="outlined"
        onClick={handleToggle}
        sx={{
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "8px",
        }}
      >
        {buttonLabel}
      </Button>

      <ArrowPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        title={title}
        content={content}
        placement={placement}
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        className={className}
      />
    </Box>
  );
};

// 1. Small Active badge popover pointing down (white variant with grey border)
export const ActiveBadgePopover: Story = {
  render: () => (
    <InteractiveDemo
      buttonLabel="Active Status Anchor"
      content="Active since 02/01/2024"
      placement="top"
      backgroundColor="#ffffff"
      borderColor="#e2e8f0"
    />
  ),
};

// 2. Small Pending badge popover pointing down (white variant with grey border)
export const PendingBadgePopover: Story = {
  render: () => (
    <InteractiveDemo
      buttonLabel="Pending Status Anchor"
      content="Effectuating 08/01/2026"
      placement="top"
      backgroundColor="#ffffff"
      borderColor="#e2e8f0"
    />
  ),
};

// 3. Full text exclusions popup card (uses the default warm cream and gold border from screenshot)
export const ExclusionsPopup: Story = {
  render: () => (
    <InteractiveDemo
      buttonLabel="Waived Waiting Period Anchor"
      title="Some treatments still require a waiting period"
      content={
        "Please note that the policy exclusions regarding work in progress, coverage for " +
        "missing teeth or Ortho (when applicable) continue to apply. You can review the full " +
        "list of exclusions and limitations in the Schedule of Benefits."
      }
      placement="top"
      width={340}
    />
  ),
};

// 4. Custom dimension sizing
export const CustomDimensions: Story = {
  render: () => (
    <InteractiveDemo
      buttonLabel="Custom Size Anchor"
      title="Set width & height"
      content="This popover menu is constrained to exactly 300px width and 160px height."
      width={300}
      height={160}
      placement="right"
    />
  ),
};

// 5. CSS Class Override story
export const ClassNameOverride: Story = {
  render: () => {
    // Inject a temporary styles string directly into document for stories demo
    const styleNode = document.createElement("style");
    styleNode.innerHTML = `
      .custom-dark-theme-popover {
        background-color: #1a1a1a !important;
        border-color: #333333 !important;
        border-radius: 12px !important;
      }
      .custom-dark-theme-popover .MuiTypography-root {
        color: #ffffff !important;
      }
      .custom-dark-theme-popover .MuiIconButton-root {
        color: #aaaaaa !important;
      }
      .custom-dark-theme-popover div[class*="Box"] {
        background-color: #1a1a1a !important;
        border-color: #333333 !important;
      }
    `;
    document.head.appendChild(styleNode);

    return (
      <InteractiveDemo
        buttonLabel="Dark Theme Anchor"
        title="Custom CSS overrides"
        content="This popover's backgrounds, borders, and margins are overridden by a custom CSS class name."
        className="custom-dark-theme-popover"
        placement="bottom"
      />
    );
  },
};
