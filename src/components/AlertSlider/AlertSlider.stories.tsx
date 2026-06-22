import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AlertSlider } from './AlertSlider';
import { Box } from '@mui/material';

const meta = {
  title: 'Feedback/AlertSlider',
  component: AlertSlider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof AlertSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

const singleImageAlert = [
  {
    id: 'discontinued',
    title: 'Your plan is being discontinued',
    description:
      'Unfortunately, your plan will no longer be offered and your policy will be terminated on XX/XX/XXXX. Shop available plan if you do not want a lapse in your dental coverage.',
    severity: 'error' as const,
  },
];

const multipleAlerts = [
  {
    id: '1',
    title: 'Your plan is being discontinued',
    description:
      'Unfortunately, your plan will no longer be offered and your policy will be terminated on XX/XX/XXXX. Shop available plan if you do not want a lapse in your dental coverage.',
    severity: 'error' as const,
  },
  {
    id: '2',
    title: 'Action required: Update billing information',
    description:
      'We were unable to process your recent monthly insurance payment. Please update your credit card details before the end of the month to keep your policy active.',
    severity: 'warning' as const,
  },
  {
    id: '3',
    title: 'New policy documents are available',
    description:
      'Your annual plan update documentation has been uploaded to your account portal. Please review the new terms and deductibles for the upcoming coverage cycle.',
    severity: 'info' as const,
  },
];

export const FigmaReference: Story = {
  args: {
    alerts: singleImageAlert,
    title: 'Alerts',
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 420 }}>
        <Story />
      </Box>
    ),
  ],
};

export const SliderCarousel: Story = {
  args: {
    alerts: multipleAlerts,
    title: 'Alerts',
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 420 }}>
        <Story />
      </Box>
    ),
  ],
};

export const Autoplay: Story = {
  args: {
    alerts: multipleAlerts,
    title: 'Alerts (Autoplay - Hover to Pause)',
    autoPlayDuration: 3000,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 420 }}>
        <Story />
      </Box>
    ),
  ],
};

export const AllSeverities: Story = {
  args: {
    alerts: [
      {
        id: 'err',
        title: 'Premium Payment Overdue (Error)',
        description: 'Your health plan has a past-due balance. Immediate action is required to avoid service suspension.',
        severity: 'error',
      },
      {
        id: 'wrn',
        title: 'Open Enrollment Period Closing Soon (Warning)',
        description: 'You have 3 days remaining to alter your family health selections or enroll in supplemental dental policies.',
        severity: 'warning',
      },
      {
        id: 'inf',
        title: 'Annual Physical Schedule Reminder (Info)',
        description: 'As part of your wellness benefit, you are eligible for one fully-covered preventive health assessment each year.',
        severity: 'info',
      },
      {
        id: 'suc',
        title: 'Prescription Claim Approved (Success)',
        description: 'Your medication claim submitted on 06/18 has been processed and successfully covered at 100% discount.',
        severity: 'success',
      },
    ],
    title: 'System Status Alerts',
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 600 }}>
        <Story />
      </Box>
    ),
  ],
};
