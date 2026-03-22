import type { Meta, StoryObj } from '@storybook/react';
import { GenericAccordion } from '../components/GenericAccordion';
import type { AccordionItem } from '../components/GenericAccordion';
import { Typography, Box, FormControlLabel, Radio, RadioGroup, Checkbox, Button } from '@mui/material';
import { TextInput } from '../components/TextInput/TextInput';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const meta = {
  title: 'Components/GenericAccordion',
  component: GenericAccordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ width: '600px', maxWidth: '100%', p: 2 }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof GenericAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// A complex form demonstration mimicking a real-world onboarding or application process
const formItems: AccordionItem[] = [
  {
    id: 'personal-info',
    title: '1. Personal Information',
    status: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
        <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 'bold' }}>
          Complete
        </Typography>
      </Box>
    ),
    content: (
      <>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Please ensure this matches your government-issued ID.
        </Typography>
        <TextInput label="Full Legal Name" placeholder="John Doe" defaultValue="Jane Doe" />
        <TextInput
          label="Email Address"
          type="email"
          placeholder="jane@example.com"
          defaultValue="jane@example.com"
          sx={{ mt: 2 }}
        />
        <TextInput
          label="Phone Number"
          type="tel"
          placeholder="(555) 555-5555"
          sx={{ mt: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button variant="contained" color="primary">Save & Continue</Button>
        </Box>
      </>
    ),
  },
  {
    id: 'insurance-details',
    title: '2. Insurance Details',
    status: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <RadioButtonCheckedIcon sx={{ color: 'warning.main', fontSize: 20 }} />
        <Typography variant="body2" sx={{ color: 'warning.main', fontWeight: 'bold' }}>
          In Progress
        </Typography>
      </Box>
    ),
    content: (
      <>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          Do you currently have an active health insurance policy?
        </Typography>
        <RadioGroup defaultValue="yes">
          <FormControlLabel value="yes" control={<Radio />} label="Yes, I have an active policy" />
          <FormControlLabel value="no" control={<Radio />} label="No, I am currently uninsured" />
        </RadioGroup>

        <TextInput
          label="Insurance Provider"
          placeholder="e.g. Blue Cross"
          sx={{ mt: 2 }}
        />

        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="I authorize my provider to bill this insurance directly."
          sx={{ mt: 2 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button variant="contained" color="primary">Save & Continue</Button>
        </Box>
      </>
    ),
  },
  {
    id: 'terms',
    title: '3. Terms and Conditions',
    status: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <RadioButtonUncheckedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
          Incomplete
        </Typography>
      </Box>
    ),
    content: (
      <>
        <Typography variant="body2" color="text.secondary" paragraph>
          By submitting this application, you agree to our standard terms of service and privacy policy. We will not share your data with 3rd parties without explicit consent.
        </Typography>
        <FormControlLabel
          control={<Checkbox />}
          label="I have read and agree to the Terms of Service"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button variant="contained" color="primary" disabled>Submit Application</Button>
        </Box>
      </>
    ),
  },
];

export const FormApplication: Story = {
  args: {
    items: formItems,
    allowMultiple: false,
  },
};

export const FormApplicationMultiOpen: Story = {
  args: {
    items: formItems,
    allowMultiple: true,
  },
};
