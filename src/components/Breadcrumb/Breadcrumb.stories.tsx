import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { Box, Typography } from '@mui/material';

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data items matching the user's exact example
const twoStepItems = [
  {
    label: 'page1',
    href: '#',
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      alert('Navigating back to page1');
    },
  },
  {
    label: 'Manage and pay',
  },
];

// Multi-step items
const multiStepItems = [
  {
    label: 'Home',
    href: '#',
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      alert('Navigating to Home');
    },
  },
  {
    label: 'Plans',
    href: '#',
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      alert('Navigating to Plans');
    },
  },
  {
    label: 'Dental Plan Details',
  },
];

// Long breadcrumb trail
const longItems = [
  {
    label: 'Home',
    href: '#',
  },
  {
    label: 'Dashboard',
    href: '#',
  },
  {
    label: 'Billing & Payments',
    href: '#',
  },
  {
    label: 'Invoices',
    href: '#',
  },
  {
    label: 'Invoice #INV-2026-983',
  },
];

export const UserExample: Story = {
  name: 'User Example (page1 > Manage and pay)',
  args: {
    items: twoStepItems,
  },
};

export const MultiStep: Story = {
  name: 'Multi-Step Trail',
  args: {
    items: multiStepItems,
  },
};

export const CustomSeparator: Story = {
  name: 'Custom Separator',
  args: {
    items: multiStepItems,
    separator: (
      <Typography variant="body2" sx={{ color: 'primary.light', mx: 0.5 }}>
        /
      </Typography>
    ),
  },
};

export const CustomIconSeparator: Story = {
  name: 'Custom Icon Separator',
  args: {
    items: [
      {
        label: 'Home',
        href: '#',
        props: {
          style: { display: 'inline-flex', alignItems: 'center', gap: '4px' },
        },
      },
      ...multiStepItems.slice(1),
    ],
  },
};

export const MobileResponsivePreview: Story = {
  name: 'Mobile Viewport Forced',
  args: {
    items: twoStepItems,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Side-by-side comparison for demo purposes
export const ViewportComparison: Story = {
  name: 'Desktop vs Mobile Comparison',
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1, color: 'text.secondary' }}>
          Desktop Viewport Representation (Shown above 600px width)
        </Typography>
        <Box sx={{ border: '1px dashed #ccc', p: 2, borderRadius: '8px', bgcolor: 'background.default' }}>
          <Breadcrumb items={multiStepItems} />
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1, color: 'text.secondary' }}>
          Mobile Viewport Simulation (Forced under 600px width display)
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mb: 2, color: 'text.secondary' }}>
          Note: In a true responsive page, the browser width determines the layout. Below is forced layout via display styles.
        </Typography>
        <Box sx={{ border: '1px dashed #ccc', p: 2, borderRadius: '8px', bgcolor: 'background.default' }}>
          {/* We simulate mobile view by manually rendering the component with forced mobile style overrides */}
          <Breadcrumb
            items={multiStepItems}
            sx={{
              '& .MuiBox-root': {
                // Force mobile view display
                '&[class*="xs-flex"]': { display: 'flex !important' },
                '&[class*="sm-flex"]': { display: 'none !important' },
              },
              // Force direct overrides for child boxes:
              // First child Box in our component has display: { xs: 'flex', sm: 'none' }
              // Second child Box in our component has display: { xs: 'none', sm: 'flex' }
              '& > div:first-of-type': { display: 'flex !important' },
              '& > div:last-of-type': { display: 'none !important' },
            }}
          />
        </Box>
      </Box>
    </Box>
  ),
};
