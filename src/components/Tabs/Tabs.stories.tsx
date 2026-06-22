import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tabs } from './Tabs';
import { Box, Typography, Button, TextField } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    id: 'plan-info',
    label: 'Plan Information',
    content: (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          HealthCare Plus Gold Plan
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Our Gold plan offers the most comprehensive medical coverage with low deductibles and co-pays.
          Ideal for individuals and families requiring regular medical care.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary">
            Download Benefits PDF
          </Button>
        </Box>
      </Box>
    ),
  },
  {
    id: 'coverage',
    label: 'Coverage & Costs',
    content: (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          What is Covered?
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • Preventive care: 100% covered (no deductible)
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • Primary care visits: $20 co-pay
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • Specialist visits: $40 co-pay
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • Prescription drugs: Generic starting at $5
        </Typography>
      </Box>
    ),
  },
  {
    id: 'docs',
    label: 'Required Documents',
    content: (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Documentation Checklist
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Please ensure you have the following documents ready to upload during enrollment:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          1. Proof of identification (Driver's license, Passport)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          2. Previous health coverage termination letter (if applicable)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          3. Social Security Number or tax identification
        </Typography>
      </Box>
    ),
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('coverage');
    return (
      <Box>
        <Box sx={{ mb: 2 }}>
          <Button variant="outlined" size="small" onClick={() => setActiveTab('plan-info')} sx={{ mr: 1 }}>
            Activate Plan Info
          </Button>
          <Button variant="outlined" size="small" onClick={() => setActiveTab('docs')}>
            Activate Required Docs
          </Button>
        </Box>
        <Tabs
          items={defaultItems}
          value={activeTab}
          onChange={setActiveTab}
        />
      </Box>
    );
  },
};

export const FullWidth: Story = {
  args: {
    items: defaultItems,
    variant: 'fullWidth',
  },
};

export const SecondaryColor: Story = {
  args: {
    items: defaultItems,
    color: 'secondary',
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: 'account',
        label: 'My Account',
        icon: <AccountCircleIcon />,
        content: (
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
            <Typography variant="h6">Account Details</Typography>
            <TextField label="Full Name" defaultValue="Jane Doe" fullWidth />
            <TextField label="Email Address" defaultValue="jane.doe@example.com" fullWidth />
            <Button variant="contained">Save Changes</Button>
          </Box>
        ),
      },
      {
        id: 'settings',
        label: 'Preferences',
        icon: <SettingsIcon />,
        content: (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>System Settings</Typography>
            <Typography variant="body2" color="text.secondary">
              Notification settings, security configurations, and third-party integrations can be set here.
            </Typography>
          </Box>
        ),
      },
      {
        id: 'faq',
        label: 'Help & FAQ',
        icon: <HelpIcon />,
        content: (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Frequently Asked Questions</Typography>
            <Typography variant="subtitle2">How do I submit a medical claim?</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Log in to the member portal, click "Claims", and upload a digital copy of your bill/receipt.
            </Typography>
          </Box>
        ),
      },
    ],
  },
};

export const VerticalLayout: Story = {
  args: {
    items: [
      {
        id: 'info',
        label: 'Information',
        icon: <InfoIcon />,
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Sidebar Info</Typography>
            <Typography variant="body1" color="text.secondary">
              This layout is ideal for complex pages with separate side-navigation columns and larger screens.
            </Typography>
          </Box>
        ),
      },
      {
        id: 'billing',
        label: 'Billing Options',
        icon: <SettingsIcon />,
        content: (
          <Box>
            <Typography variant="h6" gutterBottom>Payment Preferences</Typography>
            <Typography variant="body1" color="text.secondary">
              Configure automatic monthly premium drafts, credit card billing info, or view historical statement summaries.
            </Typography>
          </Box>
        ),
      },
      {
        id: 'disabled-tab',
        label: 'Advanced Settings (Locked)',
        icon: <AccountCircleIcon />,
        disabled: true,
        content: <Typography>Disabled state content</Typography>,
      },
    ],
    orientation: 'vertical',
  },
};
