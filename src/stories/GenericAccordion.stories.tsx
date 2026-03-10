import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import { healthTheme } from '../theme/theme';
import { GenericAccordion } from '../components/GenericAccordion';
import type { AccordionItem } from '../components/GenericAccordion';
import { Typography, Box } from '@mui/material';

const meta = {
  title: 'Components/GenericAccordion',
  component: GenericAccordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={healthTheme}>
        <Box sx={{ width: '600px', maxWidth: '100%', p: 2 }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof GenericAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: AccordionItem[] = [
  {
    id: 'panel1',
    title: 'Patient Medical History',
    content: (
      <Typography variant="body2" color="text.secondary">
        Patient has a history of hypertension and Type 2 Diabetes. 
        Currently taking Lisinopril 10mg daily and Metformin 500mg twice a day.
        No known drug allergies reported at this time.
      </Typography>
    ),
  },
  {
    id: 'panel2',
    title: 'Recent Lab Results',
    content: (
      <Box>
        <Typography variant="body2" color="text.secondary" paragraph>
          <strong>Blood Panel - Completed Oct 12, 2023</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Glucose: 105 mg/dL (Slightly Elevated)<br />
          • Cholesterol: 180 mg/dL (Normal)<br />
          • Potassium: 4.2 mEq/L (Normal)
        </Typography>
      </Box>
    ),
  },
  {
    id: 'panel3',
    title: 'Upcoming Appointments',
    content: (
      <Typography variant="body2" color="text.secondary">
        Follow-up with Dr. Smith on Nov 15th at 2:00 PM for routine checkup and medication refill.
      </Typography>
    ),
  },
];

export const DefaultSingle: Story = {
  args: {
    items: sampleItems,
    allowMultiple: false,
  },
};

export const AllowMultiple: Story = {
  args: {
    items: sampleItems,
    allowMultiple: true,
  },
};
