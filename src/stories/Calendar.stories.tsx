import type { Meta, StoryObj } from '@storybook/react';


import { Calendar } from '../components/Calendar';
import { Box } from '@mui/material';
import { useState } from 'react';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ p: 4, bgcolor: 'background.default', borderRadius: '16px' }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper for the story to show state updates
const InteractiveCalendar = (args: any) => {
  const [date, setDate] = useState<Date | null>(new Date());
  
  return (
    <Calendar 
      {...args} 
      value={date} 
      onChange={(newDate: Date | null) => setDate(newDate)} 
    />
  );
};

export const Default: Story = {
  render: InteractiveCalendar,
};

export const DisablePastDates: Story = {
  render: InteractiveCalendar,
  args: {
    disablePast: true,
  },
};
