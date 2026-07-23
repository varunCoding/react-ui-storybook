import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Typography } from "@mui/material";
import { Popup } from "./Popup";
import { PillButton } from "../PillButton";

const meta = {
  title: "Components/Popup",
  component: Popup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ p: 4, display: "flex", justifyContent: "center", minHeight: "300px" }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Popup with a single contained confirm button
export const SingleButtonAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <PillButton label="Trigger Single Action Popup" onClick={() => setOpen(true)} />
        <Popup
          open={open}
          onClose={() => setOpen(false)}
          title="Save changes?"
          content="Your settings will be applied to your profile and all linked active member devices immediately."
          primaryButton={{
            label: "Okay, save",
            onClick: () => {
              alert("Saved successfully!");
              setOpen(false);
            },
          }}
        />
      </>
    );
  },
};

// Popup with two buttons (Left: text-only secondary, Right: contained primary)
export const DoubleButtonAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <PillButton label="Trigger Double Action Popup" onClick={() => setOpen(true)} />
        <Popup
          open={open}
          onClose={() => setOpen(false)}
          title="Cancel subscription"
          content="Are you sure you want to cancel your dental plan? This action cannot be undone and you will lose coverage at the end of the billing cycle."
          primaryButton={{
            label: "Yes, cancel",
            onClick: () => {
              alert("Cancelled plan!");
              setOpen(false);
            },
          }}
          secondaryButton={{
            label: "No, keep it",
            onClick: () => setOpen(false),
          }}
        />
      </>
    );
  },
};

// Popup hosting dynamic forms inside the children slot
export const CustomFormLayout: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    return (
      <>
        <PillButton label="Trigger Form Popup" onClick={() => setOpen(true)} />
        <Popup
          open={open}
          onClose={() => setOpen(false)}
          title="Invite member"
          primaryButton={{
            label: "Send invitation",
            disabled: !email.includes("@"),
            onClick: () => {
              alert(`Invitation sent to ${email}`);
              setEmail("");
              setOpen(false);
            },
          }}
          secondaryButton={{
            label: "Cancel",
            onClick: () => setOpen(false),
          }}
        >
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
              Enter the email address of the team member you would like to invite to this dental package:
            </Typography>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="member@company.com"
              style={{
                width: "100%",
                height: "44px",
                borderRadius: "8px",
                border: "1.5px solid #ccc",
                padding: "0 12px",
                fontSize: "15px",
                boxSizing: "border-box",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
          </Box>
        </Popup>
      </>
    );
  },
};
