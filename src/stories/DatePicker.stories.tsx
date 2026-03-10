import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import { healthTheme } from '../theme/theme';
import { DatePicker } from '../components/DatePicker';
import { Box } from '@mui/material';
import { useState } from 'react';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={healthTheme}>
        <Box sx={{ width: '400px', p: 4, backgroundColor: healthTheme.palette.background.default, borderRadius: '16px' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper for the story to show state updates
const InteractiveDatePicker = (args: any) => {
  const [date, setDate] = useState<Date | null>(new Date());
  
  return (
    <DatePicker 
      {...args} 
      value={date} 
      onChange={(newDate: Date | null) => setDate(newDate)} 
    />
  );
};

export const Default: Story = {
  render: InteractiveDatePicker,
  args: {
    label: 'Appointment Date',
    fullWidth: true,
  },
};

export const Empty: Story = {
  render: InteractiveDatePicker,
  args: {
    label: 'Select Date',
    fullWidth: true,
  },
};
// Override the interactive setup for the Empty story to start with null value
Empty.render = (args: any) => {
  const [date, setDate] = useState<Date | null>(null);
  
  return (
    <DatePicker 
      {...args} 
      value={date} 
      onChange={(newDate: Date | null) => setDate(newDate)} 
    />
  );
};
